import express from 'express';
import authController from '../controller/auth.js';
import { encode } from '../modules/jwt.js';

const router = express.Router();

router
    .post('/register', authController.createUser)
    .post('/login', authController.login);

export default router;