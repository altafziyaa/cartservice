import express from "express";
import cartController from "../controller/cart.controller.js";

const router = express.Router();

router.post("/addcart", cartController.addToCart);
router.patch("/quantity", cartController.updateCartQuantity);
router.delete("/delete", cartController.removeFromCart);
router.delete("/clear", cartController.clearCart);

export default router;

// 6974e7cfb687005773ebb0ab -productId
// 696b88799f2d541b6fb983b4 - userId
