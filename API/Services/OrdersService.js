import Order from '../Models/Orders.js';
import OrderItem from '../Models/OrderItems.js';

class OrderService {
    async create(data) {
        try {
            return await Order.create(data);
        } catch (e) {
            throw new Error(`Ошибка создания заказа: ${e.message}`);
        }
    }

    async getAll() {
        try {
            return await Order.find()
                .populate('IdUsers')
                .populate('IdOrderStatus')
                .populate('IdAddress');
        } catch (e) {
            throw new Error(`Ошибка получения заказов: ${e.message}`);
        }
    }

    async getByUserId(userId) {
        try {
            return await Order.find({ IdUsers: userId })
                .populate('IdOrderStatus')
                .populate('IdAddress');
        } catch (e) {
            throw new Error(`Ошибка получения заказов пользователя: ${e.message}`);
        }
    }

    async getOne(id) {
        try {
            return await Order.findById(id)
                .populate('IdUsers')
                .populate('IdOrderStatus')
                .populate('IdAddress');
        } catch (e) {
            throw new Error(`Ошибка получения заказа: ${e.message}`);
        }
    }

    async addOrderItem(orderId, productId, quantity, price) {
        try {
            return await OrderItem.create({
                IdOrders: orderId,
                IdProducts: productId,
                Quantity: quantity,
                Price: price
            });
        } catch (e) {
            throw new Error(`Ошибка добавления товара в заказ: ${e.message}`);
        }
    }

    async update(id, data) {
        try {
            return await Order.findByIdAndUpdate(id, data, { new: true });
        } catch (e) {
            throw new Error(`Ошибка обновления заказа: ${e.message}`);
        }
    }

    async delete(id) {
        try {
            await OrderItem.deleteMany({ IdOrders: id });
            return await Order.findByIdAndDelete(id);
        } catch (e) {
            throw new Error(`Ошибка удаления заказа: ${e.message}`);
        }
    }
}

export default new OrderService();