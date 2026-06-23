import ProductDescription from "./ProductDescription.js";

class ProductDescriptionService {
    async create(data) {
        return await ProductDescription.create(data);
    }

    async getAll() {
        return await ProductDescription.find();
    }

    async getOne(id) {
        return await ProductDescription.findById(id);
    }

    async update(id, data) {
        return await ProductDescription.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await ProductDescription.findByIdAndDelete(id);
    }
}

export default new ProductDescriptionService();