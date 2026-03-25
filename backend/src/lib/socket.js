import {Server} from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173'}
});
// Used to store online users.
const userSocketMap = {};

export const getReceiverSocketId = (userId) => userSocketMap[userId];

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("online-users", Object.keys(userSocketMap));
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    if (userId) {
      delete userSocketMap[userId];
    }
    io.emit("online-users", Object.keys(userSocketMap));
  });
});
export {io, app, server};
