import * as express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import { createGame } from './src/game';

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = 3000;

let games: Record<string, ReturnType<typeof createGame>> = {};

interface Coord {
  x: number,
  y: number,
}

interface Ship {
  coords: Coord[]
}

interface Player {
  socket_id: string, // Socket Id
  ship: Ship[],
  shots_fired: Coord[]
}

interface Game {
  players: Player[],
  is_finished: boolean,
  turn: string,
}

io.on('connection', (socket) => {
  console.log(`Player ${socket.id} connected`);

  socket.on("create", (gameId) => {
    games[gameId] = createGame(gameId, socket.id);
    socket.join(gameId);
    console.log(`Player ${socket.id} created game ${gameId}`);
  })

  socket.on("join", (gameId) => {   
    if (Object.keys(games).includes(gameId) && games[gameId].players.length < 2) {
      socket.join(gameId);
      console.log(`Player ${socket.id} joined game ${gameId}`);
    } else {
      console.error(`Player ${socket.id} tried to join invalid game ${gameId}`);
    }
  })
  socket.on("shot", ({x, y}) => {
    socket.to("").emit("shot", {x, y});
  })
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
