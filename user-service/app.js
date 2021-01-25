import express from "express";
import http from "http";
import expressWinston from "express-winston";
import winston from "winston";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import cors from "cors";
import './modules/mongodb.js';
import config from "./config/index.js";
import { decode } from "./modules/jwt.js";

const PORT = config.user_service.PORT;
console.log(PORT)
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

app.use("/auth", authRouter);
app.use("/user", decode, userRouter);
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
server.listen(PORT, (req, res) => {
    console.log("Listening...");
});