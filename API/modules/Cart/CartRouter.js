import Router from 'express'
import CartController from './CartController.js';

const router = new Router()

router.post('/carts', CartController.create)
router.get('/carts', CartController.getAll)
router.get('/carts/:id', CartController.getOne)
router.put('/carts/:id', CartController.update)
router.delete('/carts/:id', CartController.delete)

export default router