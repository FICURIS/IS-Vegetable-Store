import Router from 'express'
import PostController from '../Controllers/PostController.js';
import ProductController from '../Controllers/ProductController.js';
import AddressController from '../Controllers/AddressController.js';
import CartController from '../Controllers/CartController.js';
import CartItemController from '../Controllers/CartItemController.js';
import CategoriesController from '../Controllers/CategoriesController.js';
import OrderItemsController from '../Controllers/OrderItemsController.js';
import OrdersController from '../Controllers/OrdersController.js';
import OrdersStatusController from "../Controllers/OrdersStatusController.js";
import ProductDescriptionController from "../Controllers/ProductDescriptionController.js";
import ProductImagesController from '../Controllers/ProductImagesController.js';
import ReviewsController from '../Controllers/ReviewsController.js';
import RolesController from '../Controllers/RolesController.js';
import UsersController from '../Controllers/UsersController.js';
import UsersRolesController from '../Controllers/UsersRolesController.js';

const router = new Router()

router.post('/posts', PostController.create)
router.get('/posts', PostController.getAll)
router.get('/posts/:id', PostController.getOne)
router.put('/posts/:id', PostController.update)
router.delete('/posts/:id', PostController.delete)

router.post('/products', ProductController.create)
router.get('/products', ProductController.getAll)
router.get('/products/:id', ProductController.getOne)
router.put('/products/:id', ProductController.update)
router.delete('/products/:id', ProductController.delete)

router.post('/adresses', AddressController.create)
router.get('/addresses', AddressController.getAll)
router.get('/addresses/:id', AddressController.getOne)
router.put('/addresses/:id', AddressController.update)
router.delete('/addresses/:id', AddressController.delete)

router.post('/carts', CartController.create)
router.get('/carts', CartController.getAll)
router.get('/carts/:id', CartController.getOne)
router.put('/carts/:id', CartController.update)
router.delete('/carts/:id', CartController.delete)

router.post('/cartItems', CartItemController.create)
router.get('/cartItems', CartItemController.getAll)
router.get('/cartItems/:id', CartItemController.getOne)
router.put('/cartItems/:id', CartItemController.update)
router.delete('/cartItems/:id', CartItemController.delete)

router.post('/categories', CategoriesController.create)
router.get('/categories', CategoriesController.getAll)
router.get('/categories/:id', CategoriesController.getOne)
router.put('/categories/:id', CategoriesController.update)
router.delete('/categories/:id', CategoriesController.delete)

router.post('/orderItems', OrderItemsController.create)
router.get('/orderItems', OrderItemsController.getAll)
router.get('/orderItems/:id', OrderItemsController.getOne)
router.put('/orderItems/:id', OrderItemsController.update)
router.delete('/orderItems/:id', OrderItemsController.delete)

router.post('/orders', OrdersController.create)
router.get('/orders', OrdersController.getAll)
router.get('/orders/:id', OrdersController.getOne)
router.put('/orders/:id', OrdersController.update)
router.delete('/orders/:id', OrdersController.delete)

router.post('/ordersStatus', OrdersStatusController.create)
router.get('/ordersStatus', OrdersStatusController.getAll)
router.get('/ordersStatus/:id', OrdersStatusController.getOne)
router.put('/ordersStatus/:id', OrdersStatusController.update)
router.delete('/ordersStatus/:id', OrdersStatusController.delete)

router.post('/productsDescription', ProductDescriptionController.create)
router.get('/productsDescription', ProductDescriptionController.getAll)
router.get('/productsDescription/:id', ProductDescriptionController.getOne)
router.put('/productsDescription/:id', ProductDescriptionController.update)
router.delete('/productsDescription/:id', ProductDescriptionController.delete)

router.post('/productImages', ProductImagesController.create)
router.get('/productImages', ProductImagesController.getAll)
router.get('/productImages/:id', ProductImagesController.getOne)
router.put('/productImages/:id', ProductImagesController.update)
router.delete('/productImages/:id', ProductImagesController.delete)

router.post('/reviews', ReviewsController.create)
router.get('/reviews', ReviewsController.getAll)
router.get('/reviews/:id', ReviewsController.getOne)
router.put('/reviews/:id', ReviewsController.update)
router.delete('/reviews/:id', ReviewsController.delete)

router.post('/roles', RolesController.create)
router.get('/roles', RolesController.getAll)
router.get('/roles/:id', RolesController.getOne)
router.put('/roles/:id', RolesController.update)
router.delete('/roles/:id', RolesController.delete)

router.post('/users', UsersController.create)
router.get('/users', UsersController.getAll)
router.get('/users/:id', UsersController.getOne)
router.put('/users/:id', UsersController.update)
router.delete('/users/:id', UsersController.delete)

router.post('/usersRoles', UsersRolesController.create)
router.get('/usersRoles', UsersRolesController.getAll)
router.get('/usersRoles/:id', UsersRolesController.getOne)
router.put('/usersRoles/:id', UsersRolesController.update)
router.delete('/usersRoles/:id', UsersRolesController.delete)

export default router;