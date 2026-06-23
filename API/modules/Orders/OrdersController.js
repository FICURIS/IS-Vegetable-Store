import OrdersService from "./OrdersService.js";

class OrdersController {
    async create(req, res) {
        const {
            IdUsers,
            IdOrdersStatus,
            IdAddress,
            TotalPrice
        } = req.body;

        try {
            const order = await OrdersService.create({
                IdUsers,
                IdOrdersStatus,
                IdAddress,
                TotalPrice
            });

            res.json(order);
        } catch (e) {
            res.status(500).json({
                error: `Ошибка создания заказа: ${e.message}`
            });
        }
    }

    async getAll(req, res) {
        try {
            const orders = await OrdersService.getAll();
            res.json(orders);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async getOne(req, res) {
        const { id } = req.params;

        try {
            const order = await OrdersService.getOne(id);

            if (!order) {
                return res.status(404).json({
                    error: "Заказ не найден"
                });
            }

            res.json(order);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async update(req, res) {
        const { id } = req.params;

        try {
            const updatedOrder = await OrdersService.update(id, req.body);
            res.json(updatedOrder);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            await OrdersService.delete(id);

            res.json({
                message: "Заказ удален"
            });
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }
}

export default new OrdersController();