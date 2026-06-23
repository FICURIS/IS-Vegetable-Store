import Order from "./Orders.js";
import OrderItem from "../OrderItems/OrderItems.js";

class OrdersService {
    async create(data) {
        return await Order.create(data);
    }

    async getAll() {
        return await Order.find()
            .populate("IdUsers")
            .populate("IdOrdersStatus")
            .populate("IdAddress");
    }

    async getOne(id) {
        return await Order.findById(id)
            .populate("IdUsers")
            .populate("IdOrdersStatus")
            .populate("IdAddress");
    }

    async getByUserId(userId) {
        return await Order.find({ IdUsers: userId })
            .populate("IdOrdersStatus")
            .populate("IdAddress");
    }

    async update(id, data) {
        return await Order.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        await OrderItem.deleteMany({ IdOrders: id });
        return await Order.findByIdAndDelete(id);
    }

    async addOrderItem(orderId, productId, quantity, price) {
        return await OrderItem.create({
            IdOrders: orderId,
            IdProducts: productId,
            Quantity: quantity,
            Price: price
        });
    }
}

export default new OrdersService();