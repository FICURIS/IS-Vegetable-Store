import Router from 'express'
import UsersController from '../Controllers/UsersController.js';

const router = new Router()

router.post('/users', UsersController.create)
router.get('/users', UsersController.getAll)
router.get('/users/:id', UsersController.getOne)
router.put('/users/:id', UsersController.update)
router.delete('/users/:id', UsersController.delete)

export default router