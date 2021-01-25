import express from 'express';
import chatRoom from '../controller/chat.js';

const router = express.Router();

router
  .post('/create', chatRoom.createChat)
  .post('/:roomId/message', chatRoom.postMessage)
  .get('/:roomId', chatRoom.getConversationByRoomId)
  .delete('/:roomId', chatRoom.deleteChat);

export default router;