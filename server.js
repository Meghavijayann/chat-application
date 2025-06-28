import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(cors({
  origin: '*'  // ⚠️ For now, allow all origins. You can restrict it later.
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',  // Make sure your Netlify domain is allowed here
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
