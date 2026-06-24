import mongoose from "mongoose";
import Order from "./Orders.js";
import OrderItem from "../OrderItems/OrderItems.js";
import Cart from "../Cart/Cart.js";
import CartItem from "../CartItem/CartItem.js";
import Products from "../Products/Products.js";
import Address from "../Address/Address.js";
import OrdersStatus from "../OrdersStatus/OrdersStatus.js";

class OrdersService {
    async create(data) {
        return await Order.create(data);
    }

    async getAll() {
        return await Order.find()
            .populate("IdUsers")
            .populate("IdOrdersStatus")
            .populate("IdAddress")
            .sort({ DateOrder: -1 });
    }

    async getOne(id) {
        const order = await Order.findById(id)
            .populate("IdUsers")
            .populate("IdOrdersStatus")
            .populate("IdAddress");

        if (!order) {
            return null;
        }

        const items = await OrderItem.find({ IdOrders: id })
            .populate("IdProducts")
            .populate({
                path: "IdCartItem",
                populate: { path: "IdProducts" }
            });

        return {
            order,
            items
        };
    }

    async getByUserId(userId) {
        return await Order.find({ IdUsers: userId })
            .populate("IdOrdersStatus")
            .populate("IdAddress")
            .sort({ DateOrder: -1 });
    }

    async update(id, data) {
        delete data.TotalPrice;
        delete data.IdUsers;
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

    async checkout(userId, addressId) {
        const session = await mongoose.startSession();

        try {
            let createdOrderId;

            await session.withTransaction(async () => {
                const address = await Address.findOne({
                    _id: addressId,
                    IdUsers: userId
                }).session(session);

                if (!address) {
                    const error = new Error("Адрес не найден или не принадлежит пользователю");
                    error.statusCode = 404;
                    throw error;
                }

                const cart = await Cart.findOne({ IdUsers: userId }).session(session);

                if (!cart) {
                    const error = new Error("Корзина не найдена");
                    error.statusCode = 404;
                    throw error;
                }

                const cartItems = await CartItem.find({ IdCart: cart._id })
                    .populate("IdProducts")
                    .session(session);

                if (cartItems.length === 0) {
                    const error = new Error("Корзина пуста");
                    error.statusCode = 400;
                    throw error;
                }

                let totalPrice = 0;
                const orderItemsData = [];

                for (const cartItem of cartItems) {
                    const product = cartItem.IdProducts;

                    if (!product) {
                        const error = new Error("Корзина содержит удаленный товар");
                        error.statusCode = 409;
                        throw error;
                    }

                    const updatedProduct = await Products.findOneAndUpdate(
                        {
                            _id: product._id,
                            Quantity: { $gte: cartItem.Quantity }
                        },
                        { $inc: { Quantity: -cartItem.Quantity } },
                        { new: true, session }
                    );

                    if (!updatedProduct) {
                        const error = new Error(`Недостаточно товара в наличии для продукта ${product.Name}`);
                        error.statusCode = 409;
                        throw error;
                    }

                    const price = product.Price;
                    totalPrice += cartItem.Quantity * price;

                    orderItemsData.push({
                        IdProducts: product._id,
                        IdCartItem: cartItem._id,
                        Quantity: cartItem.Quantity,
                        Price: price
                    });
                }

                const status = await this.getInitialStatus(session);
                const [order] = await Order.create([{
                    IdUsers: userId,
                    IdOrdersStatus: status._id,
                    IdAddress: addressId,
                    TotalPrice: totalPrice
                }], { session });

                await OrderItem.insertMany(
                    orderItemsData.map((item) => ({
                        ...item,
                        IdOrders: order._id
                    })),
                    { session }
                );

                await CartItem.deleteMany({ IdCart: cart._id }).session(session);
                createdOrderId = order._id;
            });

            return await this.getOne(createdOrderId);
        } finally {
            await session.endSession();
        }
    }

    async getInitialStatus(session) {
        const status = await OrdersStatus.findOne({
            Name: { $in: ["New", "Новый", "РќРѕРІС‹Р№"] }
        }).session(session);

        if (status) {
            return status;
        }

        const [createdStatus] = await OrdersStatus.create([{ Name: "New" }], { session });
        return createdStatus;
    }

    async updateStatus(orderId, statusId) {
        const order = await Order.findById(orderId).populate("IdOrdersStatus");

        if (!order) {
            const error = new Error("Заказ не найден");
            error.statusCode = 404;
            throw error;
        }

        const nextStatus = await OrdersStatus.findById(statusId);

        if (!nextStatus) {
            const error = new Error("Статус заказа не найден");
            error.statusCode = 404;
            throw error;
        }

        if (this.isFinalStatus(order.IdOrdersStatus?.Name)) {
            const error = new Error("Статус завершенного заказа не может быть изменен");
            error.statusCode = 409;
            throw error;
        }

        if (this.isNewStatus(nextStatus.Name) && !this.isNewStatus(order.IdOrdersStatus?.Name)) {
            const error = new Error("Заказ не может быть возвращен к статусу Новый");
            error.statusCode = 409;
            throw error;
        }

        order.IdOrdersStatus = nextStatus._id;
        await order.save();

        return await this.getOne(orderId);
    }

    async cancel(orderId) {
        const session = await mongoose.startSession();

        try {
            await session.withTransaction(async () => {
                const order = await Order.findById(orderId)
                    .populate("IdOrdersStatus")
                    .session(session);

                if (!order) {
                    const error = new Error("Заказ не найден");
                    error.statusCode = 404;
                    throw error;
                }

                if (this.isDeliveredStatus(order.IdOrdersStatus?.Name)) {
                    const error = new Error("Доставленный заказ не может быть отменен");
                    error.statusCode = 409;
                    throw error;
                }

                if (this.isCancelledStatus(order.IdOrdersStatus?.Name)) {
                    return;
                }

                const cancelledStatus = await this.getCancelledStatus(session);
                const items = await OrderItem.find({ IdOrders: orderId }).session(session);

                for (const item of items) {
                    if (item.IdProducts) {
                        await Products.findByIdAndUpdate(
                            item.IdProducts,
                            { $inc: { Quantity: item.Quantity } },
                            { session }
                        );
                    }
                }

                order.IdOrdersStatus = cancelledStatus._id;
                await order.save({ session });
            });

            return await this.getOne(orderId);
        } finally {
            await session.endSession();
        }
    }

    async getCancelledStatus(session) {
        const status = await OrdersStatus.findOne({
            Name: { $in: ["Cancelled", "Canceled", "Отменен", "Отменён", "РћС‚РјРµРЅРµРЅ"] }
        }).session(session);

        if (status) {
            return status;
        }

        const [createdStatus] = await OrdersStatus.create([{ Name: "Cancelled" }], { session });
        return createdStatus;
    }

    isFinalStatus(name = "") {
        return this.isDeliveredStatus(name) || this.isCancelledStatus(name);
    }

    isDeliveredStatus(name = "") {
        return ["delivered", "доставлен", "р”рѕсѓс‚р°рІр»рµрЅ"].includes(name.toLowerCase());
    }

    isCancelledStatus(name = "") {
        return ["cancelled", "canceled", "отменен", "отменён", "рћс‚рјрµрЅрµрЅ"].includes(name.toLowerCase());
    }

    isNewStatus(name = "") {
        return ["new", "новый", "рќрѕрІс‹р№"].includes(name.toLowerCase());
    }
}

export default new OrdersService();
