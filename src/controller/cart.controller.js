import cartService from "../service/cart.service.js";

class cartController {
  async addToCart(req, res, next) {
    try {
      const { productId } = req.body;
      const { userId } = req.user;

      if (!productId) {
        return res.status(400).json({ message: "productId required" });
      }

      const cart = await cartService.addToCart({ userId, productId });

      res.status(200).json({
        success: true,
        message: "Product added to cart",
        cart,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateCartQuantity(req, res, next) {
    const { productId, quantity } = req.body;
    const { userId } = req.user;

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
    const { userId } = req.user;

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
    const { userId } = req.user;

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
