import Router from 'express'
import AddressRouter from './modules/Address/AddressRouter.js'
import CartRouter from './modules/Cart/CartRouter.js'
import CartItemRouter from './modules/CartItem/CartItemRouter.js'
import CategoriesRouter from './modules/Categories/CategoriesRouter.js'
import OrderItemsRouter from './modules/OrderItems/OrderItemsRouter.js'
import OrdersRouter from './modules/Orders/OrdersRouter.js'

const router = new Router()

export default router;