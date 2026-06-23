import Products from "./Products.js";

class ProductService {
    async create(data) {
        return await Products.create(data);
    }

    async getAll(query = {}) {
        const filter = {};

        if (query.category) {
            filter.IdCategories = query.category;
        }

        return await Products.find(filter)
            .populate("IdCategories");
    }

    async getOne(id) {
        return await Products.findById(id)
            .populate("IdCategories");
    }

    async update(id, data) {
        return await Products.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Products.findByIdAndDelete(id);
    }
}

export default new ProductService();