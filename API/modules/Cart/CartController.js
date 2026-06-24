import CartService from "./CartService.js";

class CartController {
    sendError(res, error) {
        res.status(error.statusCode || 500).json({
            error: error.message
        });
    }

    async create(req, res) {
        const { IdUsers } = req.body;

        try {
            const cart = await CartService.create(IdUsers);
            res.status(201).json(cart);
        } catch (e) {
            this.sendError(res, e);
        }
    }

    async getAll(req, res) {
        try {
            const carts = await CartService.getAll();
            res.json(carts);
        } catch (e) {
            this.sendError(res, e);
        }
    }

    async getOne(req, res) {
        const { id } = req.params;

        try {
            const cart = await CartService.getOne(id);

            if (!cart) {
                return res.status(404).json({
                    error: "Cart not found"
                });
            }

            res.json(await CartService.buildCartSummary(cart));
        } catch (e) {
            this.sendError(res, e);
        }
    }

    async getByUser(req, res) {
        const { userId } = req.params;

        try {
            const cart = await CartService.getDetailedCartByUserId(userId);
            res.json(cart);
        } catch (e) {
            this.sendError(res, e);
        }
    }

    async addItem(req, res) {
        const { userId } = req.params;
        const productId = req.body.IdProducts ?? req.body.productId;
        const quantity = req.body.Quantity ?? req.body.quantity ?? 1;

        try {
            if (!productId) {
                return res.status(400).json({ error: "productId is required" });
            }

            const cart = await CartService.addItemForUser(userId, productId, quantity);
            res.status(201).json(cart);
        } catch (e) {
            this.sendError(res, e);
        }
    }

    async updateItemQuantity(req, res) {
        const { itemId } = req.params;
        const quantity = req.body.Quantity ?? req.body.quantity;

        try {
            const cart = await CartService.updateItemQuantity(itemId, quantity);
            res.json(cart);
        } catch (e) {
            this.sendError(res, e);
        }
    }

    async removeItem(req, res) {
        const { itemId } = req.params;

        try {
            const cart = await CartService.removeItemAndReturnCart(itemId);
            res.json(cart);
        } catch (e) {
            this.sendError(res, e);
        }
    }

    async clear(req, res) {
        const { id } = req.params;

        try {
            await CartService.clearCart(id);
            const cart = await CartService.getOne(id);
            res.json(await CartService.buildCartSummary(cart));
        } catch (e) {
            this.sendError(res, e);
        }
    }

    async update(req, res) {
        const { id } = req.params;

        try {
            const updatedCart = await CartService.update(id, req.body);
            res.json(updatedCart);
        } catch (e) {
            this.sendError(res, e);
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            await CartService.clearCart(id);
            await CartService.delete(id);

            res.json({
                message: "Cart deleted"
            });
        } catch (e) {
            this.sendError(res, e);
        }
    }
}

export default new CartController();
