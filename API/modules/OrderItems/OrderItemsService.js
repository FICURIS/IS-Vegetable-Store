import OrderItem from './OrderItems.js';

class OrderItemService{
    async create(orderItem, picture) {
            const fileName = fileService.saveFile(picture);
            const createdOrderItem = await OrderItem.create({...orderItem, picture: fileName});
            return createdOrderItem;
    }

    async getAll() {
            const orderItems = await OrderItem.find();
            return orderItems;
    }

    async getOne(id) {
            if (!id) {
                throw new Error('не указан ID');
            }
            const orderItem = await OrderItem.findById(id)
            return orderItem;
    }
    async update(orderItem) {
            if(!orderItem._id) {
                throw new Error('не указан ID');
            }
            const udpatedOrderItem = await OrderItem.findByIdAndUpdate(orderItems._id, orderItem, {new: true})
            return udpatedOrderItem;
    }
    async delete(id) {
            if (!id) {
                throw new Error('не указан ID');
            }
            const orderItem = await Post.findByIdAndDelete(id)
            return orderItem;
    }
}

export default new OrderItemService();