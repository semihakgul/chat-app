import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const chatMessageSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, ""),
        },
        chatRoomId: String,
        message: mongoose.Schema.Types.Mixed,
        postedByUser: String,
    },
    {
        timestamps: true,
        collection: "chatmessages",
    }
);

chatMessageSchema.statics.getConversationByRoomId = async function (chatRoomId, options = {}) {
    try {
        return this.aggregate([
            { $match: { chatRoomId } },
            { $sort: { createdAt: -1 } },
            
            // apply pagination
            { $skip: options.page * options.limit },
            { $limit: options.limit },
            { $sort: { createdAt: 1 } },
        ]);
    } catch (error) {
        throw error;
    }
};

chatMessageSchema.statics.createPostInChatRoom = async function (chatRoomId, message, postedByUser) {
    try {
        const post = await this.create({
            chatRoomId,
            message,
            postedByUser,
        });
        return post;
    } catch (error) {
        throw error;
    }
}

chatMessageSchema.statics.deleteMessagesInRoom = async function (chatRoomID){
    try {
        return this.deleteMany({chatRoomID})
    } catch (error) {
        return error
    }
}
export default mongoose.model("ChatMessage", chatMessageSchema);
