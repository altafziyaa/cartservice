import cartService from "../service/cart.service.js";

class cartController {
  async addToCart(req, res, next) {
    const { userId, product } = req.body;
    // JWT version: const { userId } = req.user;

    try {
      if (!userId)
        return res.status(400).json({ message: "user id not valid" });
      if (!product)
        return res.status(400).json({ message: "product not exist" });

      const addCart = await cartService.addToCart({ userId, product });

      return res.status(200).json({
        success: true,
        message: "product added to cart successfully",
        addCart,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCartQuantity(req, res, next) {
    const { productId, quantity } = req.body;
    const { userId } = req.user; // ✅ FIXED

    try {
      const updateCart = await cartService.updateCartQuantity({
        userId,
        productId,
        quantity,
      });

      return res.status(200).json({
        success: true,
        message: "update cart successfully",
        updateCart,
      });
    } catch (error) {
      next(error);
    }
  }

  async removeFromCart(req, res, next) {
    const { productId } = req.body;
    const { userId } = req.user; // ✅ FIXED

    try {
      const removeCarts = await cartService.removeFromCart({
        userId,
        productId,
      });

      return res.status(200).json({
        success: true,
        message: "remove cart successfully",
        removeCarts,
      });
    } catch (error) {
      next(error);
    }
  }

  async clearCart(req, res, next) {
    const { userId } = req.user; // ✅ FIXED

    try {
      const clearFromCart = await cartService.clearCart(userId);

      return res.status(200).json({
        success: true,
        message: "cart cleared",
        clearFromCart,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new cartController();
