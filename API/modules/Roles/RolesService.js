import Roles from "./Roles.js";

class RolesService {
    async create(data) {
        return await Roles.create(data);
    }

    async getAll() {
        return await Roles.find();
    }

    async getOne(id) {
        return await Roles.findById(id);
    }

    async update(id, data) {
        return await Roles.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Roles.findByIdAndDelete(id);
    }
}

export default new RolesService();