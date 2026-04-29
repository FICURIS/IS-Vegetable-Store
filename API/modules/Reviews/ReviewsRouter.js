import Router from 'express'
import ReviewsController from './ReviewsController.js';

const router = new Router()

router.post('/reviews', ReviewsController.create)
router.get('/reviews', ReviewsController.getAll)
router.get('/reviews/:id', ReviewsController.getOne)
router.put('/reviews/:id', ReviewsController.update)
router.delete('/reviews/:id', ReviewsController.delete)

export default router