import express from "express";
import cartRouter from "./src/router/cart.router.js";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("carts Service is running ");
});
app.use("/api/cart", cartRouter);
connectDB();
export default app;
