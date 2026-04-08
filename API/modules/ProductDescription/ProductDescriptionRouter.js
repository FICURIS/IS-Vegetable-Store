import Router from 'express'
import ProductDescriptionController from "../Controllers/ProductDescriptionController.js";

const router = new Router()

router.post('/productsDescription', ProductDescriptionController.create)
router.get('/productsDescription', ProductDescriptionController.getAll)
router.get('/productsDescription/:id', ProductDescriptionController.getOne)
router.put('/productsDescription/:id', ProductDescriptionController.update)
router.delete('/productsDescription/:id', ProductDescriptionController.delete)

export default router