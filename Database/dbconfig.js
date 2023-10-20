import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGOURL = process.env.MONGODBCONNECTIONSTRING;
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGOURL);
    return connection;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
