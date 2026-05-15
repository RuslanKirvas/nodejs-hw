import mongoose from "mongoose";
import {Note} from "../models/note.js";

export async function connectMongoDB() {
  try {
    const mongoUrl = process.env.MONGO_URL;

    if (!mongoUrl) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }

    await mongoose.connect(mongoUrl);


    console.log("✅ MongoDB connection established successfully");
     await Note.syncIndexes();
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
}
