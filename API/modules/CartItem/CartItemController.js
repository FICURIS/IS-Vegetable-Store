import  CartItem from './CartItem.js';
import CartItemService from "./CartItemService.js";

class CartItemController {
    async create(req, res) {
        try {
            console.log(req.files)
            const cartItem = await CartItemService.create(req.body, req.files.picture);
            res.json(cartItem)
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const cartItems = await CartItemService.getAll();
            return res.json(cartItems);
        } catch (e){
         res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const cartItem = await CartItemService.getOne(req.params.id)
                return res.json(cartItem)
        } catch (e){
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const udpatedCartItem = await CartItemService.update(req.body);
            return res.json(udpatedCartItem)
        } catch (e){
            res.status(500).json(e.message)
        }
    }
    async delete(req, res) {
        try {
            const cartItem = await CartItemService.delete(req.params.id);
            return res.json(cartItem)
        } catch (e){
            res.status(500).json(e)
        }
    }
}

export default new CartItemController();