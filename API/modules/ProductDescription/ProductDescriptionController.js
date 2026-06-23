import ProductDescriptionService from "./ProductDescriptionService.js";

class ProductDescriptionController {
    async create(req, res) {
        const {
            IdProducts,
            Variety,
            Text
        } = req.body;

        try {
            const productDescription = await ProductDescriptionService.create({
                IdProducts,
                Variety,
                Text
            });

            res.json(productDescription);
        } catch (e) {
            res.status(500).json({
                error: `Ошибка создания описания: ${e.message}`
            });
        }
    }

    async getAll(req, res) {
        try {
            const productDescriptions = await ProductDescriptionService.getAll();
            res.json(productDescriptions);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async getOne(req, res) {
        const { id } = req.params;

        try {
            const productDescription = await ProductDescriptionService.getOne(id);

            if (!productDescription) {
                return res.status(404).json({
                    error: "Описание не найдено"
                });
            }

            res.json(productDescription);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async update(req, res) {
        const { id } = req.params;

        try {
            const updated = await ProductDescriptionService.update(id, req.body);
            res.json(updated);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            await ProductDescriptionService.delete(id);

            res.json({
                message: "Описание удалено"
            });
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }
}

export default new ProductDescriptionController();