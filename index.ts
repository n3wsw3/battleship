import * as express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

let games = {};

io.on('connection', (socket) => {
  console.log("user connected");

  
});

server.listen(3000, () => {
  console.log('Running');
});
