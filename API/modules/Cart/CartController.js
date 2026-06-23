import CartService from "./CartService.js";

class CartController {
    async create(req, res) {
        const { IdUsers } = req.body;

        try {
            const cart = await CartService.create(IdUsers);
            res.json(cart);
        } catch (e) {
            res.status(500).json({
                error: `Ошибка создания корзины: ${e.message}`
            });
        }
    }

    async getAll(req, res) {
        try {
            const carts = await CartService.getAll();
            res.json(carts);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async getOne(req, res) {
        const { id } = req.params;

        try {
            const cart = await CartService.getOne(id);

            if (!cart) {
                return res.status(404).json({
                    error: "Корзина не найдена"
                });
            }

            res.json(cart);
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
            const updatedCart = await CartService.update(id, data);
            res.json(updatedCart);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            await CartService.delete(id);

            res.json({
                message: "Корзина удалена"
            });
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }
}

export default new CartController();