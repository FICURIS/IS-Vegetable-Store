import Router from 'express'
import AddressController from './AddressController.js';

const router = new Router()

router.post('/adresses', AddressController.create)
router.get('/addresses', AddressController.getAll)
router.get('/addresses/:id', AddressController.getOne)
router.put('/addresses/:id', AddressController.update)
router.delete('/addresses/:id', AddressController.delete)

export default router