import  UsersRoles from '../Models/UsersRoles.js';
import UsersRolesService from "../Services/UsersRolesService.js";

class UsersRolesController {
    async create(req, res) {
        try {
            console.log(req.files)
            const userRole = await UsersRolesService.create(req.body, req.files.picture);
            res.json(usersRole)
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const usersRoles = await UsersRolesService.getAll();
            return res.json(usersRoles);
        } catch (e){
         res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const userRole = await UsersRolesService.getOne(req.params.id)
                return res.json(userRole)
        } catch (e){
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const udpatedUserRole = await UsersRolesService.update(req.body);
            return res.json(udpatedUserRole)
        } catch (e){
            res.status(500).json(e.message)
        }
    }
    async delete(req, res) {
        try {
            const userRole = await UsersRolesService.delete(req.params.id);
            return res.json(userRole)
        } catch (e){
            res.status(500).json(e)
        }
    }
}

export default new UsersRolesController();