import  Roles from '../Models/Roles.js';
import RolesService from "../Services/RolesService.js";

class RolesController {
    async create(req, res) {
        try {
            console.log(req.files)
            const role = await RolesService.create(req.body, req.files.picture);
            res.json(role)
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const roles = await RolesService.getAll();
            return res.json(roles);
        } catch (e){
         res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const role = await RolesService.getOne(req.params.id)
                return res.json(role)
        } catch (e){
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const udpatedRole = await RolesService.update(req.body);
            return res.json(udpatedRole)
        } catch (e){
            res.status(500).json(e.message)
        }
    }
    async delete(req, res) {
        try {
            const role = await RolesService.delete(req.params.id);
            return res.json(role)
        } catch (e){
            res.status(500).json(e)
        }
    }
}

export default new RolesController();