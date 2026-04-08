import  ProductImages from '../Models/ProductImages.js';
import ProductImagesService from "./ProductImagesService.js/index.js";

class ProductImagesController {
    async create(req, res) {
        try {
            console.log(req.files)
            const productImage = await ProductImagesService.create(req.body, req.files.picture);
            res.json(productImage)
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const productImages = await ProductImagesService.getAll();
            return res.json(productImages);
        } catch (e){
         res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const productImage = await ProductImagesService.getOne(req.params.id)
                return res.json(productImage)
        } catch (e){
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const udpatedProductImage = await ProductImagesService.update(req.body);
            return res.json(udpatedProductImage)
        } catch (e){
            res.status(500).json(e.message)
        }
    }
    async delete(req, res) {
        try {
            const productImage = await ProductImagesService.delete(req.params.id);
            return res.json(productImage)
        } catch (e){
            res.status(500).json(e)
        }
    }
}

export default new ProductImagesController();