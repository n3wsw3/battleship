import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import {inspect} from 'util';
import {ClientEvents, ServerEvents} from './events';
import {Coord, GameStore, Player, Ship} from './game/store';

const app = express();
const server = createServer(app);
const io = new Server<ClientEvents, ServerEvents>(server, {
  cors: {
    origin: '*',
  },
});
const PORT = 3000;

let games = new GameStore();
// Outgoing events: [start_game, player_joined, game_finished, shoot]
// Incoming events: [create, join, shoot, ready_up]
io.on('connection', (socket) => {
  console.log(`Player ${socket.id} connected`);

  socket.on('create', (gameId, onCallback) => {
    const game = games.findById(gameId);
    if (game) return onCallback({error: 'Game Already Exists'});
    games.create(gameId, socket.id);
    socket.join(gameId);

    console.log(`Player ${socket.id} created game ${gameId}`);
    console.log(inspect(games, false, null, true));

    onCallback({msg: 'Game Created Successfully'});
  });

  socket.on('join', (gameId, onCallback) => {
    const game = games.findById(gameId);
    if (game && game.players.length < 2) {
      game.addPlayer(new Player(socket.id));
      socket.join(gameId);
      socket.to(gameId).emit('player_joined', socket.id);

      console.log(`Player ${socket.id} joined game ${gameId}`);
      console.log(inspect(games, false, null, true));
      onCallback({msg: 'Game Joined Successfully'});
    } else {
      console.warn(`Player ${socket.id} tried to join invalid game ${gameId}`);
      onCallback({error: 'No Such Game'});
    }
  });
  socket.on('shoot', ({x, y}, onCallback) => {
    const game = games.getGameFromPlayerId(socket.id);
    if (!game) return onCallback({error: 'No Such Game'});

    if (
      game.players.length < 2 ||
      !game.players.every((player) => player.is_ready)
    )
      return onCallback({error: 'All Players Are Not Ready'});

    if (game.turn !== socket.id) return onCallback({error: 'Not Your Turn'});

    const {is_hit, killed_ship} = game.shoot(+x, +y);

    console.log(inspect(games, false, null, true));
    onCallback({x, y, is_hit, killed_ship});
    socket.to(game.game_id).emit('shoot', {x, y, is_hit, killed_ship});

    // io.to(game.game_id).emit("game_finished")
  });

  socket.on('ready_up', (ships, onCallback) => {
    const game = games.getGameFromPlayerId(socket.id);
    if (!game) return onCallback({error: 'No Such Game'});

    const player = game.getPlayerFromId(socket.id);
    if (!player) return onCallback({error: 'Player Not Found'});

    player.ships = ships.map(
      (ship) => new Ship(ship.map((coord) => new Coord(coord)))
    );
    player.is_ready = true;

    console.log(inspect(games, false, null, true));
    onCallback({msg: 'Added Ships and Readied Up!'});

    // Start the game if there are more than 2 players and all of
    // the players are readied up.
    if (
      game.players.length >= 2 &&
      game.players.every((player) => player.is_ready)
    ) {
      io.to(game.game_id).emit('start_game');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export * from "./events";
