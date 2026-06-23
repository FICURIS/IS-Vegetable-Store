import CartItemService from "./CartItemService.js";

class CartItemController {
    async create(req, res) {
        const {
            IdCart,
            IdProducts,
            Quantity,
            PriceAtMoment
        } = req.body;

        try {
            const cartItem = await CartItemService.create({
                IdCart,
                IdProducts,
                Quantity,
                PriceAtMoment
            });

            res.json(cartItem);
        } catch (e) {
            res.status(500).json({
                error: `Ошибка создания позиции корзины: ${e.message}`
            });
        }
    }

    async getAll(req, res) {
        try {
            const cartItems = await CartItemService.getAll();
            res.json(cartItems);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async getOne(req, res) {
        const { id } = req.params;

        try {
            const cartItem = await CartItemService.getOne(id);

            if (!cartItem) {
                return res.status(404).json({
                    error: "Элемент корзины не найден"
                });
            }

            res.json(cartItem);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const data = req.body;

        try {
            const updatedCartItem = await CartItemService.update(id, data);
            res.json(updatedCartItem);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            await CartItemService.delete(id);

            res.json({
                message: "Элемент удален"
            });
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }
}

export default new CartItemController();