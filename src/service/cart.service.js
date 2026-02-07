import cartGlobalErrorHandler from "../utils/cart.error.handler.js";
import Carts from "../model/Carts.js";
import axios from "axios";
import services from "../config/services.js";

class cartService {
  async addToCart({ userId, productId }) {
    if (!userId) {
      throw new cartGlobalErrorHandler(401, "Unauthorized");
    }

    // 🔗 Fetch product from Product Service
    const { data } = await axios.get(
      `${services.PRODUCT_SERVICE}/api/products/${productId}`,
    );

    const product = data.data; // controller response

    let cart = await Carts.findOne({ userId });

    if (!cart) {
      return await Carts.create({
        userId,
        items: [
          {
            productId: product._id,
            price: product.price, // ✅ trusted
            quantity: 1,
          },
        ],
      });
    }

    const item = cart.items.find(
      (i) => i.productId.toString() === product._id.toString(),
    );

    if (item) item.quantity += 1;
    else
      cart.items.push({
        productId: product._id,
        price: product.price,
        quantity: 1,
      });

    return await cart.save();
  }

  async updateCartQuantity({ userId, productId, quantity }) {
    if (quantity < 1) {
      throw new cartGlobalErrorHandler(400, "Quantity must be at least 1");
    }

    const cart = await Carts.findOne({ userId });
    if (!cart) throw new cartGlobalErrorHandler(404, "Cart not found");

    const item = cart.items.find(
      (item) => item.productId.toString() === productId.toString(),
    );

    if (!item) throw new cartGlobalErrorHandler(404, "Product not in cart");

    item.quantity = quantity;
    return await cart.save();
  }

  async removeFromCart({ userId, productId }) {
    return await Carts.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId } } },
      { new: true },
    );
  }

  async clearCart(userId) {
    return await Carts.findOneAndUpdate(
      { userId },
      { items: [], totalPrice: 0, status: "active" },
      { new: true },
    );
  }
}

export default new cartService();
