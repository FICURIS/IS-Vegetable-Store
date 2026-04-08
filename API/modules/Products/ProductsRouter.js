import Router from 'express'
import ProductController from '../Controllers/ProductController.js';

const router = new Router()

router.post('/products', ProductController.create)
router.get('/products', ProductController.getAll)
router.get('/products/:id', ProductController.getOne)
router.put('/products/:id', ProductController.update)
router.delete('/products/:id', ProductController.delete)

export default router