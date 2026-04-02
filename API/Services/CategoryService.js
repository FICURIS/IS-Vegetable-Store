import Categories from '../Models/Categories.js';

class CategoryService {
    async create(data) {
        try {
            return await Category.create(data);
        } catch (e) {
            throw new Error(`Ошибка создания категории: ${e.message}`);
        }
    }

    async getAll() {
        try {
            return await Category.find();
        } catch (e) {
            throw new Error(`Ошибка получения категорий: ${e.message}`);
        }
    }

    async getOne(id) {
        try {
            return await Category.findById(id);
        } catch (e) {
            throw new Error(`Ошибка получения категории: ${e.message}`);
        }
    }

    async update(id, data) {
        try {
            return await Category.findByIdAndUpdate(id, data, { new: true });
        } catch (e) {
            throw new Error(`Ошибка обновления категории: ${e.message}`);
        }
    }

    async delete(id) {
        try {
            return await Category.findByIdAndDelete(id);
        } catch (e) {
            throw new Error(`Ошибка удаления категории: ${e.message}`);
        }
    }
}

export default new CategoryService();
