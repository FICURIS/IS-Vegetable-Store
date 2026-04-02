import  OrderItems from '../Models/OrderItems.js';
import OrderItemsService from "../Services/OrderItemsService.js";

class OrderItemsController {
    async create(req, res) {
        try {
            console.log(req.files)
            const orderItem = await OrderItemsService.create(req.body, req.files.picture);
            res.json(orderItem)
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const orderItems = await OrderItemsService.getAll();
            return res.json(orderItems);
        } catch (e){
         res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const orderItem = await OrderItemsService.getOne(req.params.id)
                return res.json(orderItem)
        } catch (e){
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const udpatedOrderItem = await OrderItemsService.update(req.body);
            return res.json(udpatedOrderItem)
        } catch (e){
            res.status(500).json(e.message)
        }
    }
    async delete(req, res) {
        try {
            const orderItem = await OrderItemsService.delete(req.params.id);
            return res.json(orderItem)
        } catch (e){
            res.status(500).json(e)
        }
    }
}

export default new OrderItemsController();