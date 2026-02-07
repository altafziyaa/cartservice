import express from "express";
import cartController from "../controller/cart.controller.js";
import { authMiddleware } from "../middleware/cart.middleware.js";

const router = express.Router();

router.post("/addcart", authMiddleware, cartController.addToCart);
router.patch("/quantity", authMiddleware, cartController.updateCartQuantity);
router.delete("/delete", authMiddleware, cartController.removeFromCart);
router.delete("/clear", authMiddleware, cartController.clearCart);

export default router;
