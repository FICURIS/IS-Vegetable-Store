import ProductService from "../Services/ProductService.js";

class ProductController {
    async create(req, res) {
        try {
            console.log(req.files)
            const product = await ProductService.create(req.body);
            res.json(product)
        } catch(e) {
            res.status(500).json(e.message)
        }
    }

    async getAll(req, res) {
        try {
            const products = await ProductService.getAll();
            return res.json(products);
        } catch (e){
         res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const product = await ProductService.getOne(req.params.id)
                return res.json(product)
        } catch (e){
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const udpatedProduct = await ProductService.update(req.body);
            return res.json(udpatedProduct)
        } catch (e){
            res.status(500).json(e.message)
        }
    }
    async delete(req, res) {
        try {
            const product = await ProductService.delete(req.params.id);
            return res.json(product)
        } catch (e){
            res.status(500).json(e)
        }
    }
}

export default new ProductController();