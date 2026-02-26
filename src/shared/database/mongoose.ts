import mongoose from "mongoose";
import { env } from "../config/env";

let isConnected = false;

export const connectMongo = async () => {
  if (isConnected) return;

  if (!env.MONGO_URL) {
    throw new Error("MONGO_URL is not defined");
  }

  await mongoose.connect(env.MONGO_URL, {
    dbName: env.MONGO_DB_NAME,
    autoIndex: env.NODE_ENV !== "production",
  });

  isConnected = true;

  console.log("MongoDB connected");
};

export const disconnectMongo = async () => {
  if (!isConnected) return;

  await mongoose.disconnect();
  isConnected = false;

  console.log("MongoDB disconnected");
};

export default mongoose;
