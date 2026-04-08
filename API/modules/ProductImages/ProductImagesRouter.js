import Router from 'express'
import ProductImagesController from '../Controllers/ProductImagesController.js';

const router = new Router()

router.post('/productImages', ProductImagesController.create)
router.get('/productImages', ProductImagesController.getAll)
router.get('/productImages/:id', ProductImagesController.getOne)
router.put('/productImages/:id', ProductImagesController.update)
router.delete('/productImages/:id', ProductImagesController.delete)

export default router