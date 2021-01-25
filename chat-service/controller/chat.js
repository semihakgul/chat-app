
import ChatRoomModel from '../model/ChatRoom.js';
import ChatMessageModel from '../model/ChatMessage.js';
import config from '../config/index.js';
import axios from 'axios'

export default {
  createChat: async (req, res) => {

    const { chatFriendName } = req.body;
    const { HOST, PORT } = config.user_service
    // build the URL for user service API call 
    const user_service_url = `http://${HOST}:${PORT}/user/name/${chatFriendName}`;

    // make an API call to user service
    axios.get(user_service_url, {
      // authorization token is added to the request
      headers: {
        'Authorization': `${req.headers.authorization}`
      }
    })
      .then(async (response) => {
        // response.data: {userId, userName, blockedUsers}
        const data = response.data;
        if (data.blockedUsers.includes(req.userId)) {
          return res.status(400).json({ message: "this account is blocked by the user" })
        }

        try {
          const chatInitiator = req.userId;
          const allUserIds = [chatInitiator, data.userId];
          const chatRoom = await ChatRoomModel.initiateChat(allUserIds, chatInitiator);

          return res.status(200).json({ success: true, chatRoom });

        } catch (error) {
          return res.status(400).json({ message: "" })
        }
        return res.status(200).json({ message: "got the user" })
      })
      .catch(error => {
        console.log(error)
        return res.status(400).json({ message: "this userName does not exist" })
      });

  },
 
  postMessage: async (req, res) => {
    try {
      console.log("post message")
      const { roomId } = req.params;
      const room = await ChatRoomModel.getChatRoomByRoomId(roomId);
      if(!room) return res.status(400).json({message:"room does not exist"})
      const messagePayload = {
        messageText: req.body.messageText,
      };
      const currentLoggedUser = req.userId;
      const post = await ChatMessageModel.createPostInChatRoom(roomId, messagePayload, currentLoggedUser);

      global.io.sockets.in(roomId).emit('new message', { message: post });

      return res.status(200).json({ success: true, post });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error: error })
    }
  },
  getConversationByRoomId: async (req, res) => {
    try {
      const { roomId } = req.params;
      const room = await ChatRoomModel.getChatRoomByRoomId(roomId)
      if (!room) {
        return res.status(400).json({
          success: false,
          message: 'No room exists for this id',
        })
      }
      const options = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10,
      };
      const conversation = await ChatMessageModel.getConversationByRoomId(roomId, options);
      return res.status(200).json({
        success: true,
        conversation,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },
  deleteChat: async (req, res) => {
    const chatRoomId  = req.params.roomId;
    var message = [];
    try {
      ChatRoomModel.deleteChat(chatRoomId);
      message.push('Chat room has been deleted');
    } catch (error) {
      return res.status(400).json({ message: "Chat room can't be deleted" });
    }
    try {
      ChatMessageModel.deleteMessagesInRoom(chatRoomId);
      message.push('Chat room messages have been deleted');
    } catch (error) {
      return res.status(400).json({ message: "Chat room messages can't be deleted" });
    }
    return res.status(200).json({ message });
  }
}