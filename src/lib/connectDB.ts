import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MongoDB URI not found in the environment variables");

    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("error connecting to mongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
