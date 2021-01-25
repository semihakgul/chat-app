import dotenv from "dotenv"
dotenv.config();

const appConfig = {
  SECRET_KEY: process.env.SECRET_KEY,
  user_service: {
    HOST: process.env.USER_SERVICE_HOST,
    PORT:process.env.USER_SERVICE_PORT,
    db: {
      URL: process.env.USER_SERVICE_DB_URL,
      NAME: process.env.USER_SERVICE_DB_NAME
    }
  },
  chat_service: {
    HOST: process.env.CHAT_SERVICE_HOST,
    PORT:process.env.CHAT_SERVICE_PORT,
    db: {
      URL: process.env.CHAT_SERVICE_DB_URL,
      NAME: process.env.CHAT_SERVICE_DB_NAME
    }
  }
}

export default appConfig;