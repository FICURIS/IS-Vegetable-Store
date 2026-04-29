import Router from 'express'
import UsersRolesController from './UsersRolesController.js';

const router = new Router()

router.post('/usersRoles', UsersRolesController.create)
router.get('/usersRoles', UsersRolesController.getAll)
router.get('/usersRoles/:id', UsersRolesController.getOne)
router.put('/usersRoles/:id', UsersRolesController.update)
router.delete('/usersRoles/:id', UsersRolesController.delete)

export default router