import Router from 'express'
import OrderItemsController from './OrderItemsController.js';

const router = new Router()

router.post('/orderItems', OrderItemsController.create)
router.get('/orderItems', OrderItemsController.getAll)
router.get('/orderItems/:id', OrderItemsController.getOne)
router.put('/orderItems/:id', OrderItemsController.update)
router.delete('/orderItems/:id', OrderItemsController.delete)

export default router