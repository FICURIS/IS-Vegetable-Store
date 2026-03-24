import Router from 'express'
import PostController from '../Controllers/PostController.js';
import ProductController from '../Controllers/ProductController.js';

const router = new Router()

router.post('/posts', PostController.create)
router.get('/posts', PostController.getAll)
router.get('/posts/:id', PostController.getOne)
router.put('/posts', PostController.update)
router.delete('/posts/:id', PostController.delete)

router.post('/products', ProductController.create)
router.get('/products', ProductController.getAll)
router.get('/products/:id', ProductController.getOne)
router.put('/products', ProductController.update)
router.delete('/products/:id', ProductController.delete)

export default router;