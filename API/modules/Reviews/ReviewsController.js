import ReviewsService from "./ReviewsService.js";

class ReviewsController {
    async create(req, res) {
        const {
            IdProducts,
            IdOrders,
            Rating,
            Text
        } = req.body;

        try {
            if (!IdProducts) {
                return res.status(400).json({
                    error: "IdProducts обязателен"
                });
            }

            const review = await ReviewsService.create({
                IdProducts,
                IdOrders,
                Rating,
                Text
            });

            res.json(review);
        } catch (e) {
            res.status(500).json({
                error: `Ошибка создания отзыва: ${e.message}`
            });
        }
    }

    async getAll(req, res) {
        try {
            const reviews = await ReviewsService.getAll();
            res.json(reviews);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async getOne(req, res) {
        const { id } = req.params;

        try {
            const review = await ReviewsService.getOne(id);

            if (!review) {
                return res.status(404).json({
                    error: "Отзыв не найден"
                });
            }

            res.json(review);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async update(req, res) {
        const { id } = req.params;

        try {
            const updatedReview = await ReviewsService.update(id, req.body);
            res.json(updatedReview);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            await ReviewsService.delete(id);

            res.json({
                message: "Отзыв удален"
            });
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }
}

export default new ReviewsController();