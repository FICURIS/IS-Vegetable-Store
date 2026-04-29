import Router from 'express'
import RolesController from './RolesController.js';

const router = new Router()

router.post('/roles', RolesController.create)
router.get('/roles', RolesController.getAll)
router.get('/roles/:id', RolesController.getOne)
router.put('/roles/:id', RolesController.update)
router.delete('/roles/:id', RolesController.delete)

export default router