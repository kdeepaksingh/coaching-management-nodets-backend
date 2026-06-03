import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI: string = String(process.env.MONGODBURI);
// Connect to MongoDB

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`mongodb connect to DB: ${MONGODB_URI}`);
  } catch (error: any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
