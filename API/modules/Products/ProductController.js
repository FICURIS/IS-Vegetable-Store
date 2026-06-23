import ProductService from "./ProductService.js";

class ProductController {
    async create(req, res) {
        const {
            Name,
            Quantity,
            Price,
            IdCategories
        } = req.body;

        try {
            if (!Name || Quantity === undefined || Price === undefined) {
                return res.status(400).json({
                    error: "Name, Quantity, Price обязательны"
                });
            }

            const product = await ProductService.create({
                Name,
                Quantity,
                Price,
                IdCategories
            });

            res.json(product);
        } catch (e) {
            res.status(500).json({
                error: `Ошибка создания продукта: ${e.message}`
            });
        }
    }

    async getAll(req, res) {
        try {
            const products = await ProductService.getAll(req.query);
            res.json(products);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async getOne(req, res) {
        const { id } = req.params;

        try {
            const product = await ProductService.getOne(id);

            if (!product) {
                return res.status(404).json({
                    error: "Продукт не найден"
                });
            }

            res.json(product);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async update(req, res) {
        const { id } = req.params;

        const data = {
            Name: req.body.Name ?? req.body.name,
            Quantity: req.body.Quantity ?? req.body.quantity,
            Price: req.body.Price ?? req.body.price,
            IdCategories: req.body.IdCategories ?? req.body.category
        };

        Object.keys(data).forEach(
            key => data[key] === undefined && delete data[key]
        );

        try {
            const updatedProduct = await ProductService.update(id, data);
            res.json(updatedProduct);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            await ProductService.delete(id);

            res.json({
                message: "Продукт удален"
            });
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }
}

export default new ProductController();