import jwt from 'jsonwebtoken';
import UserModel from '../model/User.js';
import config from '../config/index.js';

const SECRET_KEY = config.SECRET_KEY;

export const encode = (userId) => {
  const payload = {
    userId,
  };
  const authToken = jwt.sign(payload, SECRET_KEY);
  console.log('Auth', authToken);
  return authToken;
}

export const decode = (req, res, next) => {
  console.log("decode a girdi")
  if (!req.headers['authorization']) {
    console.log("no access token")
    return res.status(400).json({ success: false, message: 'No access token provided' });
  }
  const accessToken = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(accessToken, SECRET_KEY);
    req.userId = decoded.userId;
    console.log("userid",req.userId)
    return next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ success: false, message: error.message });
  }
}