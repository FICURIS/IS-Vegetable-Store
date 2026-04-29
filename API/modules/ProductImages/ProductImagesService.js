import ProductImages from "./ProductImages.js";
import fileService from '../Post/fileService.js';

class ProductImagesService{
    async create(productImage, picture) {
            const fileName = fileService.saveFile(picture);
            const createdProductImage = await ProductImages.create({...productImage, picture: fileName});
            return createdProductImage;
    }

    async getAll() {
            const productImages = await ProductImages.find();
            return productImages;
    }

    async getOne(id) {
            if (!id) {
                throw new Error('не указан ID');
            }
            const productImage = await ProductImages.findById(id)
            return productImage;
    }
    async update(productImage) {
            if(!productImage._id) {
                throw new Error('не указан ID');
            }
            const updatedProductImage = await ProductImages.findByIdAndUpdate(productImage._id, productImage, {new: true})
            return updatedProductImage;
    }
    async delete(id) {
            if (!id) {
                throw new Error('не указан ID');
            }
            const productImage = await ProductImages.findByIdAndDelete(id)
            return productImage;
    }
}

export default new ProductImagesService();