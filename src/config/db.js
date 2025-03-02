import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }

  try {
    console.log("mongo", MONGODB_URI);
    const con = await mongoose.connect(MONGODB_URI);
    console.log("Database connected", con.connection.host);
  } catch (error) {
    console.log("Error in connecting to database", error);
    throw new Error("Error connecting to database");
  }
};

export default connectDB;
