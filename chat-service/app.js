import express from "express";
import expressWinston from "express-winston";
import winston from "winston";
import http from "http";
import cors from "cors";
import socketio from "socket.io";
import WebSocket from "./util/WebSocket.js";
import chatRoomRouter from "./route/chat.js";
import { decode } from "./util/jwt.js"
import "./util/DB.js"
import config from "./config/index.js"

const PORT = config.chat_service.PORT;

const app = express();
app.use(expressWinston.logger({
    transports: [
        new winston.transports.File({
            filename: 'info.log',
            level: 'info',
        })
    ]
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/chat", decode, chatRoomRouter);
app.use(function(req, res) {
    res.send(404).json({message:"invalid path"})
});
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.File({
            filename: 'info.log',
            level: 'info',
        })
    ]
}));

const server = http.createServer(app);

global.io = socketio.listen(server);
global.io.on('connection', WebSocket.connection);

server.listen(PORT, (req, res) => {
    console.log(`Listening on port:: http://localhost:${PORT}/`);
});