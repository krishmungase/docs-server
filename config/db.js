import mongoose from "mongoose";
import Config from "./index.js";

const connectDB = async () => {
  const DB_URL = Config.DB_URL;
  if (!DB_URL) throw new Error("DB not connected!");
  await mongoose.connect(DB_URL);
};

export default connectDB;
