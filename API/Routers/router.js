import Router from 'express'
import AddressRouter from '../modules/Address/AddressRouter.js'
import CartRouter from '../modules/Cart/CartRouter.js'
import CartItemRouter from '../modules/CartItem/CartItemRouter.js'
import CategoriesRouter from '../modules/Categories/CategoriesRouter.js'
import OrderItemsRouter from '../modules/OrderItems/OrderItemsRouter.js'
import OrdersRouter from '../modules/Orders/OrdersRouter.js'
import OrdersStatusRouter from '../modules/OrdersStatus/OrdersStatusRouter.js'
import PostRouter from '../modules/Post/PostRouter.js'
import ProductDescriptionRouter from '../modules/ProductDescription/ProductDescriptionRouter.js'
import ProductImagesRouter from '../modules/ProductImages/ProductImagesRouter.js'
import ProductsRouter from '../modules/Products/ProductsRouter.js'
import ReviewsRouter from '../modules/Reviews/ReviewsRouter.js'
import RolesRouter from '../modules/Roles/RolesRouter.js'
import UserRouter from '../modules/Users/UsersRouter.js'
import UsersRolesRouter from '../modules/UsersRoles/UsersRolesRouter.js'

const router = new Router()

router.use(AddressRouter)
router.use(CartRouter)
router.use(CartItemRouter)
router.use(CategoriesRouter)
router.use(OrderItemsRouter)
router.use(OrdersRouter)
router.use(OrdersStatusRouter)
router.use(ProductDescriptionRouter)
router.use(ProductsRouter)
router.use(ReviewsRouter)
router.use(RolesRouter)
router.use(UserRouter)
router.use(UsersRolesRouter)

export default router
