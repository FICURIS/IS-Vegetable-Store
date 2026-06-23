import OrderItem from "./OrderItems.js";

class OrderItemsService {
    async create(data) {
        return await OrderItem.create(data);
    }

    async getAll() {
        return await OrderItem.find()
            .populate("IdOrders")
            .populate("IdCartItem");
    }

    async getOne(id) {
        return await OrderItem.findById(id)
            .populate("IdOrders")
            .populate("IdCartItem");
    }

    async update(id, data) {
        return await OrderItem.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await OrderItem.findByIdAndDelete(id);
    }
}

export default new OrderItemsService();