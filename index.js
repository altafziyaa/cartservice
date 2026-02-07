import express from "express";
import cartRouter from "./src/router/cart.router.js";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/v1", cartRouter);
connectDB();
export default app;
