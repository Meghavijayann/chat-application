import http from 'http';
import { Server } from 'socket.io';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'https://superlative-blini-4687af.netlify.app',
  methods: ['GET', 'POST'],
  credentials: true
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'https://superlative-blini-4687af.netlify.app',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => console.log('Server running on 3000'));
