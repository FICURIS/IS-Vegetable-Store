import  Reviews from './Reviews.js';
import ReviewsService from "./ReviewsService.js";

class ReviewsController {
    async create(req, res) {
        try {
            console.log(req.files)
            const review = await ReviewsService.create(req.body, req.files.picture);
            res.json(review)
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const reviews = await ReviewsService.getAll();
            return res.json(reviews);
        } catch (e){
         res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const review = await ReviewsService.getOne(req.params.id)
                return res.json(review)
        } catch (e){
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const udpatedReview = await ReviewsService.update(req.body);
            return res.json(udpatedReview)
        } catch (e){
            res.status(500).json(e.message)
        }
    }
    async delete(req, res) {
        try {
            const review = await ReviewsService.delete(req.params.id);
            return res.json(review)
        } catch (e){
            res.status(500).json(e)
        }
    }
}

export default new ReviewsController();