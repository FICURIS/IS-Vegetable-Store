import Cart from "./Cart.js";
import CartItem from "../CartItem/CartItem.js";
import Products from "../Products/Products.js";

class CartService {
    async create(userId) {
        return await this.getOrCreateByUserId(userId);
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

    async getOrCreateByUserId(userId, options = {}) {
        let cart = await Cart.findOne({ IdUsers: userId }).session(options.session || null);

        if (!cart) {
            cart = await Cart.create([{ IdUsers: userId }], { session: options.session || null });
            return cart[0];
        }

        return cart;
    }

    async getCartItems(cartId) {
        return await CartItem.find({ IdCart: cartId })
            .populate("IdProducts");
    }

    async getDetailedCartByUserId(userId) {
        const cart = await this.getOrCreateByUserId(userId);
        return await this.buildCartSummary(cart);
    }

    async buildCartSummary(cart) {
        const items = await CartItem.find({ IdCart: cart._id })
            .populate("IdProducts");

        const totalQuantity = items.reduce((sum, item) => sum + item.Quantity, 0);
        const totalPrice = items.reduce((sum, item) => sum + item.Quantity * item.PriceAtMoment, 0);

        return {
            cart,
            items,
            totalQuantity,
            totalPrice
        };
    }

    normalizeQuantity(quantity) {
        const normalized = Number(quantity);

        if (!Number.isInteger(normalized) || normalized < 1) {
            const error = new Error("Quantity must be a positive integer");
            error.statusCode = 400;
            throw error;
        }

        return normalized;
    }

    async addItemForUser(userId, productId, quantity) {
        const requestedQuantity = this.normalizeQuantity(quantity);
        const product = await Products.findById(productId);

        if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            throw error;
        }

        const cart = await this.getOrCreateByUserId(userId);
        const existingItem = await CartItem.findOne({
            IdCart: cart._id,
            IdProducts: productId
        });

        const newQuantity = (existingItem?.Quantity || 0) + requestedQuantity;

        if (newQuantity > product.Quantity) {
            const error = new Error(`Only ${product.Quantity} units of this product are available`);
            error.statusCode = 409;
            throw error;
        }

        if (existingItem) {
            existingItem.Quantity = newQuantity;
            existingItem.PriceAtMoment = product.Price;
            await existingItem.save();
        } else {
            await CartItem.create({
                IdCart: cart._id,
                IdProducts: productId,
                Quantity: requestedQuantity,
                PriceAtMoment: product.Price
            });
        }

        return await this.buildCartSummary(cart);
    }

    async removeItem(itemId) {
        return await CartItem.findByIdAndDelete(itemId);
    }

    async updateItemQuantity(itemId, quantity) {
        const normalizedQuantity = this.normalizeQuantity(quantity);
        const item = await CartItem.findById(itemId).populate("IdProducts");

        if (!item) {
            const error = new Error("Cart item not found");
            error.statusCode = 404;
            throw error;
        }

        if (normalizedQuantity > item.IdProducts.Quantity) {
            const error = new Error(`Only ${item.IdProducts.Quantity} units of this product are available`);
            error.statusCode = 409;
            throw error;
        }

        item.Quantity = normalizedQuantity;
        item.PriceAtMoment = item.IdProducts.Price;
        await item.save();

        const cart = await Cart.findById(item.IdCart);
        return await this.buildCartSummary(cart);
    }

    async clearCart(cartId) {
        return await CartItem.deleteMany({ IdCart: cartId });
    }

    async removeItemAndReturnCart(itemId) {
        const item = await CartItem.findById(itemId);

        if (!item) {
            const error = new Error("Cart item not found");
            error.statusCode = 404;
            throw error;
        }

        const cart = await Cart.findById(item.IdCart);
        await item.deleteOne();

        return await this.buildCartSummary(cart);
    }
}

export default new CartService();
