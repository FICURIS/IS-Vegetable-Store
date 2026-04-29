import Router from 'express'
import OrdersStatusController from "./OrdersStatusController.js";

const router = new Router()

router.post('/ordersStatus', OrdersStatusController.create)
router.get('/ordersStatus', OrdersStatusController.getAll)
router.get('/ordersStatus/:id', OrdersStatusController.getOne)
router.put('/ordersStatus/:id', OrdersStatusController.update)
router.delete('/ordersStatus/:id', OrdersStatusController.delete)

export default router