import OrdersStatus from "./OrdersStatus.js";
import fileService from '../Post/fileService.js';

class OrderStatusService{
    async create(orderStatus, picture) {
            const fileName = fileService.saveFile(picture);
            const createdOrderStatus = await OrderStatus.create({...orderStatus, picture: fileName});
            return createdOrderStatus;
    }

    async getAll() {
            const ordersStatus = await OrderStatus.find();
            return ordersStatus;
    }

    async getOne(id) {
            if (!id) {
                throw new Error('не указан ID');
            }
            const orderStatus = await OrderStatus.findById(id)
            return orderStatus;
    }
    async update(orderStatus) {
            if(!orderStatus._id) {
                throw new Error('не указан ID');
            }
            const udpatedOrderStatus = await OrderStatus.findByIdAndUpdate(orderStatus._id, orderStatus, {new: true})
            return updateOrderStatus;
    }
    async delete(id) {
            if (!id) {
                throw new Error('не указан ID');
            }
            const orderStatus = await OrderStatus.findByIdAndDelete(id)
            return orderStatus;
    }
}

export default new OrderStatusService();