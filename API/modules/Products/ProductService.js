import Products from "../Models/Products.js"

class ProductService{
    async create(data) {
            return await ProductService.create(data);
    }

    async getAll(query) {
            const filter = {};
            if (query.category) {
                    filter.categoryId = query.category;
            }

            return await ProductService.find(filter);
    }

    async getOne(id) {
            return await Product.findById(id);
    }
}

export default new ProductService();