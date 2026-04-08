import  ProductDescription from '../Models/ProductDescription.js';
import ProductDescriptionService from "./ProductDescriptionService.js/index.js";

class ProductDescriptionController {
    async create(req, res) {
        try {
            console.log(req.files)
            const productDescription = await ProductDescriptionService.create(req.body, req.files.picture);
            res.json(productDescription)
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const productDescriptions = await ProductDescriptionService.getAll();
            return res.json(productDescriptions);
        } catch (e){
         res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const productDescription = await ProductDescriptionService.getOne(req.params.id)
                return res.json(productDescription)
        } catch (e){
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const udpatedProductDescription = await ProductDescriptionService.update(req.body);
            return res.json(udpatedProductDescription)
        } catch (e){
            res.status(500).json(e.message)
        }
    }
    async delete(req, res) {
        try {
            const productDescription = await ProductDescriptionService.delete(req.params.id);
            return res.json(productDescription)
        } catch (e){
            res.status(500).json(e)
        }
    }
}

export default new ProductDescriptionController();