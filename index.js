import express, { json } from "express";
import cartRouter from "./src/router/cart.router.js";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(json());
const PORT = process.env.PORT || 4004;

app.use("api/v1", cartRouter);
connectDB();
app.listen(PORT, () => {
  console.log(`app running on http://localhost:${PORT}`);
});

// http://localhost:3000/api/v1/addcart
