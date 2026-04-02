import  Categories from '../Models/Categories.js';
import CategoriesService from "../Services/CategoryService.js";

class CategoriesController {
    async create(req, res) {
        try {
            console.log(req.files)
            const categorie = await CategoriesService.create(req.body, req.files.picture);
            res.json(categorie)
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const categories = await CategoriesService.getAll();
            return res.json(categories);
        } catch (e){
         res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const categorie = await CategoriesService.getOne(req.params.id)
                return res.json(categorie)
        } catch (e){
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const udpatedCategorie = await CategoriesService.update(req.body);
            return res.json(udpatedCategorie)
        } catch (e){
            res.status(500).json(e.message)
        }
    }
    async delete(req, res) {
        try {
            const categorie = await CategoriesService.delete(req.params.id);
            return res.json(categorie)
        } catch (e){
            res.status(500).json(e)
        }
    }
}

export default new CategoriesController();