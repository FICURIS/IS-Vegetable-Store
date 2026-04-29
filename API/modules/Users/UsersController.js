import  User from './Users.js';
import UsersService from "./UsersService.js";

class UsersController {
    async create(req, res) {
        try {
            console.log(req.files)
            const user = await UsersService.create(req.body, req.files.picture);
            res.json(user)
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const users = await UsersService.getAll();
            return res.json(users);
        } catch (e){
         res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const user = await UsersService.getOne(req.params.id)
                return res.json(user)
        } catch (e){
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const udpatedUser = await UsersService.update(req.body);
            return res.json(udpatedUsers)
        } catch (e){
            res.status(500).json(e.message)
        }
    }
    async delete(req, res) {
        try {
            const user = await UsersService.delete(req.params.id);
            return res.json(user)
        } catch (e){
            res.status(500).json(e)
        }
    }
}

export default new UsersController();