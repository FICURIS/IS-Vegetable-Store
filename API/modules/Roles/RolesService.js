import Roles from "./Roles.js";
import fileService from '../Post/fileService.js';

class RolesService{
    async create(role, picture) {
            const fileName = fileService.saveFile(picture);
            const createdRole = await Roles.create({...role, picture: fileName});
            return createdRole;
    }

    async getAll() {
            const roles = await Roles.find();
            return roles;
    }

    async getOne(id) {
            if (!id) {
                throw new Error('не указан ID');
            }
            const role = await Roles.findById(id)
            return role;
    }
    async update(role) {
            if(!role._id) {
                throw new Error('не указан ID');
            }
            const updatedRole = await Roles.findByIdAndUpdate(role._id, role, {new: true})
            return updatedRole;
    }
    async delete(id) {
            if (!id) {
                throw new Error('не указан ID');
            }
            const role = await Roles.findByIdAndDelete(id)
            return role;
    }
}

export default new RolesService();