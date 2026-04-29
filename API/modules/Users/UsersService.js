import User from "./Users.js";

class UserService {
    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (e) {
            throw new Error(`Ошибка создания пользователя: ${e.message}`);
        }
    }

    async getAll() {
        try {
            return await User.find();
        } catch (e) {
            throw new Error(`Ошибка получения пользователей: ${e.message}`);
        }
    }

    async getOne(id) {
        try {
            return await User.findById(id);
        } catch (e) {
            throw new Error(`Ошибка получения пользователя: ${e.message}`);
        }
    }

    async update(id, data) {
        try {
            return await User.findByIdAndUpdate(id, data, { new: true });
        } catch (e) {
            throw new Error(`Ошибка обновления пользователя: ${e.message}`);
        }
    }

    async delete(id) {
        try {
            return await User.findByIdAndDelete(id);
        } catch (e) {
            throw new Error(`Ошибка удаления пользователя: ${e.message}`);
        }
    }

    async getByEmail(email) {
        try {
            return await User.findOne({ Email: email });
        } catch (e) {
            throw new Error(`Ошибка поиска пользователя: ${e.message}`);
        }
    }
}

export default new UserService();