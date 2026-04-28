//path: backend/src/server.ts
import dotenv from 'dotenv';
import http from 'http';
import {Server} from "socket.io"
import app from './app';
import connectDB from './config/db';


dotenv.config();

// Connect to the database before starting the server
connectDB();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    }
});

io.on('connection', (socket) => {
  console.log('🔌Socket connected', socket.id);

  socket.on("join", (userId: string) => {
    socket.join(userId);
    console.log(`👤 User with ID: ${userId} joined their room`);
});

socket.on("disconnect", () => {
    console.log("❌ Socket disconnected", socket.id);
})

});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})