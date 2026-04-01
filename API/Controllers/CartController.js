import  Cart from '../Models/Cart.js';
import CartService from "../Services/CartService.js";

class CartController {
    async create(req, res) {
        try {
            console.log(req.files)
            const cart = await CartService.create(req.body, req.files.picture);
            res.json(cart)
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const carts = await CartService.getAll();
            return res.json(carts);
        } catch (e){
         res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const cart = await CartService.getOne(req.params.id)
                return res.json(cart)
        } catch (e){
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const udpatedCart = await CartService.update(req.body);
            return res.json(udpatedCart)
        } catch (e){
            res.status(500).json(e.message)
        }
    }
    async delete(req, res) {
        try {
            const cart = await CartService.delete(req.params.id);
            return res.json(cart)
        } catch (e){
            res.status(500).json(e)
        }
    }
}

export default new CartController();