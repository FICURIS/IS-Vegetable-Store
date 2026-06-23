import UsersRoles from "./UsersRoles.js";

class UsersRolesService {
    async create(data) {
        return await UsersRoles.create(data);
    }

    async getAll() {
        return await UsersRoles.find()
            .populate("IdUsers")
            .populate("IdRoles");
    }

    async getOne(id) {
        return await UsersRoles.findById(id)
            .populate("IdUsers")
            .populate("IdRoles");
    }

    async update(id, data) {
        return await UsersRoles.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await UsersRoles.findByIdAndDelete(id);
    }
}

export default new UsersRolesService();