import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectDB() {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    // console.log(db);
    console.log("Database Connected");
  } catch (error) {
    console.error("DB Connection Error:", error.message);
    process.exit(1);
  }
}
