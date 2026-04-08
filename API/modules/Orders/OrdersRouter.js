import Router from 'express'
import OrdersController from '../Controllers/OrdersController.js';

const router = new Router()

router.post('/orders', OrdersController.create)
router.get('/orders', OrdersController.getAll)
router.get('/orders/:id', OrdersController.getOne)
router.put('/orders/:id', OrdersController.update)
router.delete('/orders/:id', OrdersController.delete)

export default router