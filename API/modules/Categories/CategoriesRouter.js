import Router from 'express'
import CategoriesController from '../Controllers/CategoriesController.js';

const router = new Router()

router.post('/categories', CategoriesController.create)
router.get('/categories', CategoriesController.getAll)
router.get('/categories/:id', CategoriesController.getOne)
router.put('/categories/:id', CategoriesController.update)
router.delete('/categories/:id', CategoriesController.delete)

export default router