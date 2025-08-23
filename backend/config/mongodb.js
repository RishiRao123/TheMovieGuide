import mongoose from "mongoose";
import { DB_NAME } from "../constants/constants.js";

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables.");
    }

    const connectionInstance = await mongoose.connect(
      `${MONGODB_URI}/${DB_NAME}`
    );

    console.log(
      `MongoDB connected successfully...  HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection error...", error);
    process.exit(1);
  }
};

export default connectDB;
