import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import {createGame, createPlayer} from './src/game';
import {
  getGameFromPlayerId,
  getGameIdFromPlayerId,
  getNextPlayerInGame,
  getPlayerInGame,
  isShotAHit,
} from './src/helper';
import {Games, Ship} from './types';
import {inspect} from 'util';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
const PORT = 3000;

type Callback = (payload: {err: string} | {msg: string}) => {};

let games: Games = {};
// Outgoing events: [start_game, player_joined, game_finished, shoot]
// Incoming events: [create, join, shoot, ready_up]
io.on('connection', (socket) => {
  console.log(`Player ${socket.id} connected`);

  socket.on('create', (gameId, onCallback: Callback) => {
    if (games[gameId]) return onCallback({err: 'Game already exists'});
    games[gameId] = createGame(gameId, socket.id);
    socket.join(gameId);
    console.log(`Player ${socket.id} created game ${gameId}`);
    console.log(inspect(games, false, null, true));
    onCallback({msg: 'Game Created Successfully'});
  });

  socket.on('join', (gameId, onCallback: Callback) => {
    if (
      Object.keys(games).includes(gameId) &&
      games[gameId].players.length < 2
    ) {
      games[gameId].players.push(createPlayer(socket.id));
      socket.join(gameId);
      socket.to(gameId).emit('player_joined', socket.id);

      console.log(`Player ${socket.id} joined game ${gameId}`);
      onCallback({msg: 'Gamed Joined Successfully'});
    } else {
      console.warn(`Player ${socket.id} tried to join invalid game ${gameId}`);
      onCallback({err: 'No Such Game'});
    }
  });
  socket.on('shoot', ({x, y}, onCallback: Callback) => {
    const game = getGameFromPlayerId(games, socket.id);
    if (!game) return onCallback({err: 'Game not found'});
    if (game.turn !== socket.id) return onCallback({err: 'Not Your Turn'});

    // Update the main game state
    const player = getPlayerInGame(game, socket.id);
    if (!player) return onCallback({err: "No Such Player"});

    player.shots_fired.push({x, y});

    // Find the id of the next person in the person array and set it to their turn
    let currentPlayerIndex = game.players.findIndex(
      (player) => player.socket_id === socket.id
    );
    game.turn =
      game.players[(currentPlayerIndex + 1) % game.players.length].socket_id;

    const nextPlayer = getNextPlayerInGame(game, socket.id);
    if (!nextPlayer) return onCallback({err: "Cannot Get Next Player"});

    let isHit = isShotAHit({x, y}, nextPlayer.ship);
    if (isHit) console.log("HIT");
    
    // Send the updated shot to all players
    socket.to(getGameIdFromPlayerId(games, socket.id)).emit('shoot', {x, y});

    onCallback({msg: 'Nice Shot'});
  });

  socket.on('ready_up', (ship: Ship[], onCallback: Callback) => {
    const game = getGameFromPlayerId(games, socket.id);
    if (!game) return onCallback({err: 'Game not found'});

    const player = getPlayerInGame(game, socket.id);
    if (!player) return onCallback({err: 'Player not found'});

    player.ship = ship;
    player.is_ready = true;

    onCallback({msg: 'Added Ships and Readied Up!'});

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
