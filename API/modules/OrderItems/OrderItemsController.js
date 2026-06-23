import OrderItemsService from "./OrderItemsService.js";

class OrderItemsController {
    async create(req, res) {
        try {
            const {
                IdOrders,
                IdCartItem,
                Quantity,
                Price
            } = req.body;

            const orderItem = await OrderItemsService.create({
                IdOrders,
                IdCartItem,
                Quantity,
                Price
            });

            res.json(orderItem);
        } catch (e) {
            res.status(500).json({
                error: `Ошибка создания позиции заказа: ${e.message}`
            });
        }
    }

    async getAll(req, res) {
        try {
            const orderItems = await OrderItemsService.getAll();
            res.json(orderItems);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async getOne(req, res) {
        const { id } = req.params;

        try {
            const orderItem = await OrderItemsService.getOne(id);

            if (!orderItem) {
                return res.status(404).json({
                    error: "Элемент заказа не найден"
                });
            }

            res.json(orderItem);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async update(req, res) {
        const { id } = req.params;

        try {
            const updatedOrderItem = await OrderItemsService.update(id, req.body);
            res.json(updatedOrderItem);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            await OrderItemsService.delete(id);

            res.json({
                message: "Элемент заказа удален"
            });
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }
}

export default new OrderItemsController();