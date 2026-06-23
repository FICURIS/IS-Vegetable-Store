import OrdersStatusService from "./OrdersStatusService.js";

class OrdersStatusController {
    async create(req, res) {
        try {
            const { Name } = req.body;

            const orderStatus = await OrdersStatusService.create({ Name });
            res.json(orderStatus);
        } catch (e) {
            res.status(500).json({
                error: `Ошибка создания статуса заказа: ${e.message}`
            });
        }
    }

    async getAll(req, res) {
        try {
            const ordersStatus = await OrdersStatusService.getAll();
            res.json(ordersStatus);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async getOne(req, res) {
        const { id } = req.params;

        try {
            const orderStatus = await OrdersStatusService.getOne(id);

            if (!orderStatus) {
                return res.status(404).json({
                    error: "Статус заказа не найден"
                });
            }

            res.json(orderStatus);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async update(req, res) {
        const { id } = req.params;

        try {
            const updatedOrderStatus = await OrdersStatusService.update(id, req.body);
            res.json(updatedOrderStatus);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            await OrdersStatusService.delete(id);

            res.json({
                message: "Статус заказа удален"
            });
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }
}

export default new OrdersStatusController();