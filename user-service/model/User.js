import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    userName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    blockedUsers: {
      type: Array,
      required: true,
      default: []
    },
    logs: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true,
    collection: "users",
  }
);

/**
 * @param {String} userName
 * @param {String} password
 * @returns {Object} new user object created
 */
userSchema.statics.createUser = async function (userName, password) {
  try {
    const user = await this.create({ userName, password });
    return user;
  } catch (error) {
    throw error;
  }
}


/**
 * @param {String} userName 
 * @return {Object} user
 */
userSchema.statics.getUserByName = async function (userName) {
  try {
    const user = await this.findOne({
      userName
    }).exec();
    return user;
  } catch (error) {
    throw error;
  }
}


/**
 * @param {String} userId
 * @return {Object} user
 */
userSchema.statics.getUserById = async function (userId) {
  try {
    const user = await this.findOne({ _id: userId }).exec();
    return user;
  } catch (error) {
    throw error;
  }
}


/**
 * @param {String} userName 
 * @return {Object} user
 */
userSchema.statics.getUserByName = async function (userName) {
  try {
    const user = await this.findOne({ userName }).exec();
    return user;
  } catch (error) {
    throw error;
  }
}


/**
 * @param {String} userName 
 * @return {Object} user
 */
userSchema.statics.updateUserLogByUserName = async function (userName,logData) {
  try {
    const user = await this.findOneAndUpdate(
      { userName},
      { $push: { logs: logData } }).exec();
    return user;
  } catch (error) {
    throw error;
  }
}


/**
 * @param {String} userName 
 * @return {Object} user
 */
userSchema.statics.updateBlockedUsers = async function (userId, blockedUserId, blockValue) {
  try {
    // `doc` is the document _before_ `update` was applied
    if (blockValue) {
      const user = this.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { blockedUsers: blockedUserId } });
      return user;
    }else{
      const user = this.findOneAndUpdate(
        { _id: userId },
        { $pull: { blockedUsers: blockedUserId } });
        return user;
    }
  } catch (error) {
    throw error;
  }
}


/**
 * @param {String} userName 
 * @return {boolean} 
 */

userSchema.statics.userNameExists = async function (userName) {
  try {
    console.log("burada")
    const count = await this.count({ userName });
    console.log(count)
    return count;
  } catch (error) {
    console.log("hata")
    return true
  }

}
export default mongoose.model("User", userSchema);