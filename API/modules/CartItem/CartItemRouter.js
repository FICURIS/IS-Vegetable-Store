import Router from 'express'
import CartItemController from '../Controllers/CartItemController.js';

const router = new Router()

router.post('/cartItems', CartItemController.create)
router.get('/cartItems', CartItemController.getAll)
router.get('/cartItems/:id', CartItemController.getOne)
router.put('/cartItems/:id', CartItemController.update)
router.delete('/cartItems/:id', CartItemController.delete)

export default router