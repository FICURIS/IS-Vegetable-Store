import OrdersStatus from "./OrdersStatus.js";

class OrdersStatusService {
    async create(data) {
        return await OrdersStatus.create(data);
    }

    async getAll() {
        return await OrdersStatus.find();
    }

    async getOne(id) {
        return await OrdersStatus.findById(id);
    }

    async update(id, data) {
        return await OrdersStatus.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await OrdersStatus.findByIdAndDelete(id);
    }
}

export default new OrdersStatusService();