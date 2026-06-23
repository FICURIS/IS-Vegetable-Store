import User from "./Users.js";

class UsersService {
    async create(data) {
        return await User.create(data);
    }

    async getAll() {
        return await User.find();
    }

    async getOne(id) {
        return await User.findById(id);
    }

    async update(id, data) {
        return await User.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );
    }

    async delete(id) {
        return await User.findByIdAndDelete(id);
    }

    async getByEmail(email) {
        return await User.findOne({ Email: email });
    }
}

export default new UsersService();