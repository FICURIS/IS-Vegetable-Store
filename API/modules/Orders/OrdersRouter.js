import Router from 'express'
import OrdersController from './OrdersController.js';

const router = new Router()

router.post('/orders', OrdersController.create)
router.post('/orders/checkout', OrdersController.checkout)
router.get('/orders', OrdersController.getAll)
router.get('/orders/user/:userId', OrdersController.getByUser)
router.get('/orders/:id', OrdersController.getOne)
router.put('/orders/:id', OrdersController.update)
router.patch('/orders/:id/status', OrdersController.updateStatus)
router.post('/orders/:id/cancel', OrdersController.cancel)
router.delete('/orders/:id', OrdersController.delete)

export default router
