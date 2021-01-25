import jwt from 'jsonwebtoken'
import UserModel from '../model/User.js';

const userController = {
    blockUserById: async (req, res) => {
        try {
            const user = await UserModel.updateBlockedUsers(req.userId, req.params.blockedUserId, req.body.blockValue)
            return res.status(200).json({ message: req.body.blockValue?"user has been blocked":"block has been removed" , user})

        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: "failed" })
        }
    },
    getUserById: async (req, res) => {
        try {
            console.log("here")
            const { userId } = req.params;
            const user = await UserModel.getUserById(userId);
            console.log(user)
            return res.status(200).json({ userId: user._id, userName: user.userName, blockedUsers:user.blockedUsers})
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: "there exists no user with the given userId" })
        }
    },
    getUserByName: async (req, res) => {
        try {
            const { userName } = req.params;

            const user = await UserModel.getUserByName(userName);
            return res.status(200).json({ userId: user._id, userName: user.userName, blockedUsers:user.blockedUsers})
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: "there exists no user with the given userId" })
        }
    }
}

export default userController;