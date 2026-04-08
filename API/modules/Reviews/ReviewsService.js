import Reviews from "../Models/Reviews.js";

class ReviewService {
    async create(data) {
        try {
            return await Review.create(data);
        } catch (e) {
            throw new Error(`Ошибка создания отзыва: ${e.message}`);
        }
    }

    async getAll() {
        try {
            return await Review.find()
                .populate('IdProducts')
                .populate('IdUsers')
                .populate('IdOrders');
        } catch (e) {
            throw new Error(`Ошибка получения отзывов: ${e.message}`);
        }
    }

    async getByProduct(productId) {
        try {
            return await Review.find({ IdProducts: productId })
                .populate('IdUsers');
        } catch (e) {
            throw new Error(`Ошибка получения отзывов товара: ${e.message}`);
        }
    }

    async getOne(id) {
        try {
            return await Review.findById(id)
                .populate('IdProducts')
                .populate('IdUsers')
                .populate('IdOrders');
        } catch (e) {
            throw new Error(`Ошибка получения отзыва: ${e.message}`);
        }
    }

    async update(id, data) {
        try {
            return await Review.findByIdAndUpdate(id, data, { new: true });
        } catch (e) {
            throw new Error(`Ошибка обновления отзыва: ${e.message}`);
        }
    }

    async delete(id) {
        try {
            return await Review.findByIdAndDelete(id);
        } catch (e) {
            throw new Error(`Ошибка удаления отзыва: ${e.message}`);
        }
    }
}

export default new ReviewService();
