import Cart from "./Cart.js";
import CartItem from "../CartItem/CartItem.js";

class CartService {
    async create(userId) {
        return await Cart.create({ IdUsers: userId });
    }

    async getAll() {
        return await Cart.find();
    }

    async getOne(id) {
        return await Cart.findById(id);
    }

    async update(id, data) {
        return await Cart.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Cart.findByIdAndDelete(id);
    }

    async getByUserId(userId) {
        return await Cart.findOne({ IdUsers: userId });
    }

    async getCartItems(cartId) {
        return await CartItem.find({ IdCart: cartId })
            .populate("IdProducts");
    }

    async addItem(cartId, productId, quantity, price) {
        return await CartItem.create({
            IdCart: cartId,
            IdProducts: productId,
            Quantity: quantity,
            PriceAtMoment: price
        });
    }

    async removeItem(itemId) {
        return await CartItem.findByIdAndDelete(itemId);
    }

    async updateItemQuantity(itemId, quantity) {
        return await CartItem.findByIdAndUpdate(
            itemId,
            { Quantity: quantity },
            { new: true }
        );
    }

    async clearCart(cartId) {
        return await CartItem.deleteMany({ IdCart: cartId });
    }
}

export default new CartService();