import Reviews from "./Reviews.js";

class ReviewsService {
    async create(data) {
        return await Reviews.create(data);
    }

    async getAll() {
        return await Reviews.find()
            .populate("IdProducts")
            .populate("IdOrders");
    }

    async getOne(id) {
        return await Reviews.findById(id)
            .populate("IdProducts")
            .populate("IdOrders");
    }

    async getByProduct(productId) {
        return await Reviews.find({ IdProducts: productId })
            .populate("IdProducts")
            .populate("IdOrders");
    }

    async update(id, data) {
        return await Reviews.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Reviews.findByIdAndDelete(id);
    }
}

export default new ReviewsService();