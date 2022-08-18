import * as express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import {createGame} from './src/game';
import { Game, Player } from './types';

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = 3000;

let games: Record<string, Game> = {};

const getGameFromPlayerId = (playerId: string): Game => {
  return games[getGameIdFromPlayerId(playerId)];
}

const getGameIdFromPlayerId = (playerId: string): string => {
  let playerGame = Object.keys(games).find((value) =>
    games[value].players.find((value) => value.socket_id === playerId)
  );
  return playerGame || "";
};

const getPlayerInGame = (game: Game, playerId: string): Player|undefined => {
  return game.players.find(player => player.socket_id === playerId);
}

io.on('connection', (socket) => {
  console.log(`Player ${socket.id} connected`);

  socket.on('create', (gameId) => {
    games[gameId] = createGame(gameId, socket.id);
    socket.join(gameId);
    console.log(`Player ${socket.id} created game ${gameId}`);
  });

  socket.on('join', (gameId) => {
    if (
      Object.keys(games).includes(gameId) &&
      games[gameId].players.length < 2
    ) {
      socket.join(gameId);
      console.log(`Player ${socket.id} joined game ${gameId}`);
    } else {
      console.warn(`Player ${socket.id} tried to join invalid game ${gameId}`);
    }
  });
  socket.on('shot', ({x, y}) => {
    const game = getGameFromPlayerId(socket.id);
    if (game.turn === socket.id) {
      
      socket.to(getGameIdFromPlayerId(socket.id)).emit('shot', {x, y});
      // Find the id of the next person in the person array
      let currentPlayerIndex = game.players.findIndex(player => player.socket_id === socket.id);
      game.turn = game.players[(currentPlayerIndex+1) % game.players.length].socket_id;
    } else {
      console.warn(`Player ${socket.id} tried to shot when its not their turn`);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
