import  OrdersStatus from '../Models/OrdersStatus.js';
import OrdersStatusService from "./OrdersStatusService.js/index.js";

class OrdersStatusController {
    async create(req, res) {
        try {
            console.log(req.files)
            const orderStatus = await OrdersStatusService.create(req.body, req.files.picture);
            res.json(orderStatus)
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const ordersStatus = await OrdersStatusService.getAll();
            return res.json(ordersStatus);
        } catch (e){
         res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const orderStatus = await OrdersStatusService.getOne(req.params.id)
                return res.json(orderStatus)
        } catch (e){
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const udpatedOrderStatus = await OrdersStatusService.update(req.body);
            return res.json(udpatedOrderStatus)
        } catch (e){
            res.status(500).json(e.message)
        }
    }
    async delete(req, res) {
        try {
            const orderStatus = await OrdersStatusService.delete(req.params.id);
            return res.json(orderStatus)
        } catch (e){
            res.status(500).json(e)
        }
    }
}

export default new OrdersStatusController();