import UserModel from '../model/User.js';
import {encode} from '../modules/jwt.js'
import bcrypt from 'bcrypt';
const authController = {
    createUser: async (req, res, next) => {

        try {
            if (!req.body || !req.body.userName || !req.body.password) return res.status(400).json({ error: "'userName' or 'password' can not be left empty" });
            const { userName, password } = req.body


            if (await UserModel.userNameExists(userName)) return res.status(400).json({ error: "userName exists" })

            let hash = bcrypt.hashSync(password, 10);
            try {
                const user = await UserModel.createUser(userName, hash);
                return res.status(200).json({ success: true, userName: user.userName })
            } catch (error) {
                return res.status(500).json({ error: "encryption error" });
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({ success: false, error })
        }
    },
    login: async (req, res) => {
        try {
            
            if (!req.body || !req.body.userName || !req.body.password) return res.status(400).json({ error: "'userName' or 'password' can not be left empty" });
            
            const {userName, password} = req.body

            const user = await UserModel.getUserByName(userName);
            
            var loginSucces;
            if(!bcrypt.compareSync(password, user.password)) {
                loginSucces = false;
                return res.status(400).json({error:"password is false"})
            }
            else{
                loginSucces = true;
            }
            try {
                await UserModel.updateUserLogByUserName(userName, {type:"login",success:loginSucces, date:Date.now()})
            } catch (error) {
                console.log("error: log error")
            }

            const authToken = encode(user._id);

            return res.status(200).json({ success: true, userId:user._id, authToken });
        
        } catch (error) {
            
            return res.status(400).json({ hata: "hata" });
        
        }
    },
}

export default authController;