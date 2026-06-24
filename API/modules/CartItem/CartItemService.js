import CartItem from "./CartItem.js";
import Cart from "../Cart/Cart.js";
import Products from "../Products/Products.js";

class CartItemService {
    async create(data) {
        const quantity = this.normalizeQuantity(data.Quantity ?? data.quantity);
        const cart = await Cart.findById(data.IdCart);
        const product = await Products.findById(data.IdProducts);

        if (!cart) {
            const error = new Error("Cart not found");
            error.statusCode = 404;
            throw error;
        }

        if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            throw error;
        }

        if (quantity > product.Quantity) {
            const error = new Error(`Only ${product.Quantity} units of this product are available`);
            error.statusCode = 409;
            throw error;
        }

        return await CartItem.create({
            IdCart: cart._id,
            IdProducts: product._id,
            Quantity: quantity,
            PriceAtMoment: product.Price
        });
    }

    async getAll() {
        return await CartItem.find();
    }

    async getOne(id) {
        return await CartItem.findById(id);
    }

    async update(id, data) {
        const item = await CartItem.findById(id).populate("IdProducts");

        if (!item) {
            const error = new Error("Cart item not found");
            error.statusCode = 404;
            throw error;
        }

        if (data.Quantity !== undefined || data.quantity !== undefined) {
            const quantity = this.normalizeQuantity(data.Quantity ?? data.quantity);

            if (quantity > item.IdProducts.Quantity) {
                const error = new Error(`Only ${item.IdProducts.Quantity} units of this product are available`);
                error.statusCode = 409;
                throw error;
            }

            item.Quantity = quantity;
        }

        item.PriceAtMoment = item.IdProducts.Price;
        return await item.save();
    }

    async delete(id) {
        return await CartItem.findByIdAndDelete(id);
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
}

export default new CartItemService();
