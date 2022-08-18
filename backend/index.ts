import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import {createGame} from './src/game';
import { getGameFromPlayerId, getGameIdFromPlayerId, getPlayerInGame } from './src/helper';
import { Game, Games, Player } from './types';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});
const PORT = 3000;

let games: Games = {};

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
    const game = getGameFromPlayerId(games, socket.id);
    if (game.turn === socket.id) {
      // Update the main game state
      getPlayerInGame(game, socket.id)?.shots_fired.push({x, y});

      // Find the id of the next person in the person array and set it to their turn
      let currentPlayerIndex = game.players.findIndex(player => player.socket_id === socket.id);
      game.turn = game.players[(currentPlayerIndex+1) % game.players.length].socket_id;
      
      // Send the updated shot to all players
      socket.to(getGameIdFromPlayerId(games, socket.id)).emit('shot', {x, y});
    } else {
      console.warn(`Player ${socket.id} tried to shot when its not their turn`);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
