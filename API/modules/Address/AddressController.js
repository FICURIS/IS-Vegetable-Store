import  Address from './Address.js';
import AddressService from "./AddressService.js";

class AddressController {
    async create(req, res) {
        try {
            console.log(req.files)
            const address = await AddressService.create(req.body, req.files.picture);
            res.json(address)
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const addresses = await AddressService.getAll();
            return res.json(addresses);
        } catch (e){
         res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const address = await AddressService.getOne(req.params.id)
                return res.json(address)
        } catch (e){
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const udpatedAdress = await AdressService.update(req.body);
            return res.json(udpatedAdress)
        } catch (e){
            res.status(500).json(e.message)
        }
    }
    async delete(req, res) {
        try {
            const address = await AddressService.delete(req.params.id);
            return res.json(address)
        } catch (e){
            res.status(500).json(e)
        }
    }
}

export default new AddressController();