import  Orders from '../Models/Orders.js';
import OrdersService from "./OrdersService.js/index.js";

class OrdersController {
    async create(req, res) {
        try {
            console.log(req.files)
            const order = await OrdersService.create(req.body, req.files.picture);
            res.json(order)
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const orders = await OrdersService.getAll();
            return res.json(orders);
        } catch (e){
         res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const order = await OrdersService.getOne(req.params.id)
                return res.json(order)
        } catch (e){
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const udpatedOrder = await OrdersService.update(req.body);
            return res.json(udpatedOrder)
        } catch (e){
            res.status(500).json(e.message)
        }
    }
    async delete(req, res) {
        try {
            const order = await OrdersService.delete(req.params.id);
            return res.json(order)
        } catch (e){
            res.status(500).json(e)
        }
    }
}

export default new OrdersController();