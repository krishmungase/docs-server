import dotenv from "dotenv";
dotenv.config();

const { PORT, DB_URL, JWT_SECRET, FRONTEND_URL, MAIL_FROM, MAIL_PORT, MAIL_HOST, MAIL_PASSWORD, MAIL_USERNAME } = process.env;

const Config = {
  PORT,
  DB_URL,
  JWT_SECRET,
  FRONTEND_URL,
  MAIL_FROM,
  MAIL_PORT,
  MAIL_HOST,
  MAIL_PASSWORD,
  MAIL_USERNAME
};

export default Config;
