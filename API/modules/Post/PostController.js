import  Post from './Post.js';
import PostService from "./PostService.js";

class Controller {
    async create(req, res) {
        try {
            console.log(req.files)
            const post = await PostService.create(req.body, req.files.picture);
            res.json(post)
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const posts = await PostService.getAll();
            return res.json(posts);
        } catch (e){
         res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const post = await PostService.getOne(req.params.id)
                return res.json(post)
        } catch (e){
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const udpatedPost = await PostService.update(req.body);
            return res.json(udpatedPost)
        } catch (e){
            res.status(500).json(e.message)
        }
    }
    async delete(req, res) {
        try {
            const post = await PostService.delete(req.params.id);
            return res.json(post)
        } catch (e){
            res.status(500).json(e)
        }
    }
}

export default new Controller();