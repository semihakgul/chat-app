import express from 'express';
import userController from '../controller/user.js';
const router = express.Router();

router
    .get('/id/:userId', userController.getUserById)
    .post('/block/:blockedUserId', userController.blockUserById)
    .get('/name/:userName', userController.getUserByName);

export default router;