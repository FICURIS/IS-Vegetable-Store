import OrdersService from "./OrdersService.js";

class OrdersController {
    sendError(res, error) {
        res.status(error.statusCode || 500).json({
            error: error.message
        });
    }

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

            res.status(201).json(order);
        } catch (e) {
            this.sendError(res, e);
        }
    }

    async checkout(req, res) {
        const userId = req.body.IdUsers ?? req.body.userId;
        const addressId = req.body.IdAddress ?? req.body.addressId;

        try {
            if (!userId || !addressId) {
                return res.status(400).json({
                    error: "userId and addressId are required"
                });
            }

            const order = await OrdersService.checkout(userId, addressId);
            res.status(201).json(order);
        } catch (e) {
            this.sendError(res, e);
        }
    }

    async getAll(req, res) {
        try {
            const orders = await OrdersService.getAll();
            res.json(orders);
        } catch (e) {
            this.sendError(res, e);
        }
    }

    async getOne(req, res) {
        const { id } = req.params;

        try {
            const order = await OrdersService.getOne(id);

            if (!order) {
                return res.status(404).json({
                    error: "Order not found"
                });
            }

            res.json(order);
        } catch (e) {
            this.sendError(res, e);
        }
    }

    async getByUser(req, res) {
        const { userId } = req.params;

        try {
            const orders = await OrdersService.getByUserId(userId);
            res.json(orders);
        } catch (e) {
            this.sendError(res, e);
        }
    }

    async update(req, res) {
        const { id } = req.params;

        try {
            const updatedOrder = await OrdersService.update(id, req.body);
            res.json(updatedOrder);
        } catch (e) {
            this.sendError(res, e);
        }
    }

    async updateStatus(req, res) {
        const { id } = req.params;
        const statusId = req.body.IdOrdersStatus ?? req.body.statusId;

        try {
            if (!statusId) {
                return res.status(400).json({
                    error: "statusId is required"
                });
            }

            const order = await OrdersService.updateStatus(id, statusId);
            res.json(order);
        } catch (e) {
            this.sendError(res, e);
        }
    }

    async cancel(req, res) {
        const { id } = req.params;

        try {
            const order = await OrdersService.cancel(id);
            res.json(order);
        } catch (e) {
            this.sendError(res, e);
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            await OrdersService.delete(id);

            res.json({
                message: "Order deleted"
            });
        } catch (e) {
            this.sendError(res, e);
        }
    }
}

export default new OrdersController();
