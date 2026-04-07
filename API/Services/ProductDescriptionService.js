import ProductDescription from "../Models/ProductDescription.js";
import fileService from '../Services/fileService.js';

class ProductDescriptionService{
    async create(productDescription, picture) {
            const fileName = fileService.saveFile(picture);
            const createdProductDescription = await ProductDescription.create({...productDescription, picture: fileName});
            return createdProductDescription;
    }

    async getAll() {
            const productsDescription = await ProductDescription.find();
            return productsDescription;
    }

    async getOne(id) {
            if (!id) {
                throw new Error('не указан ID');
            }
            const productDescription = await ProductDescription.findById(id)
            return productDescription;
    }
    async update(productDescription) {
            if(!productDescription._id) {
                throw new Error('не указан ID');
            }
            const udpatedProductDescription = await ProductDescription.findByIdAndUpdate(productDescription._id, productDescription, {new: true})
            return updateProductDescription;
    }
    async delete(id) {
            if (!id) {
                throw new Error('не указан ID');
            }
            const productDescription = await ProductDescription.findByIdAndDelete(id)
            return productDescription;
    }
}

export default new ProductDescriptionService();