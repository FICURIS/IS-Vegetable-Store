import CartItem from "./CartItem.js";

class CartItemService {
    async create(data) {
        return await CartItem.create(data);
    }

    async getAll() {
        return await CartItem.find();
    }

    async getOne(id) {
        return await CartItem.findById(id);
    }

    async update(id, data) {
        return await CartItem.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await CartItem.findByIdAndDelete(id);
    }
}

export default new CartItemService();