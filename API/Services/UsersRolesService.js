import UsersRoles from "../Models/UsersRoles.js";
import fileService from '../Services/fileService.js';

class UsersRolesService{
    async create(userRole, picture) {
            const fileName = fileService.saveFile(picture);
            const createdUserRole = await UsersRoles.create({...userRole, picture: fileName});
            return createdUserRole;
    }

    async getAll() {
            const userRoles = await UsersRoles.find();
            return userRoles;
    }

    async getOne(id) {
            if (!id) {
                throw new Error('не указан ID');
            }
            const userRole = await UsersRoles.findById(id)
            return userRole;
    }
    async update(userRole) {
            if(!userRole._id) {
                throw new Error('не указан ID');
            }
            const updatedUserRole = await UsersRoles.findByIdAndUpdate(userRole._id, userRole, {new: true})
            return updatedUserRole;
    }
    async delete(id) {
            if (!id) {
                throw new Error('не указан ID');
            }
            const userRole = await UsersRoles.findByIdAndDelete(id)
            return userRole;
    }
}

export default new UsersRolesService();