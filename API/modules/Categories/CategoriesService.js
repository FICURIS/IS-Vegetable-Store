import Categories from './Categories.js';

class CategoriesService {
    async create(data) {
        return await Categories.create(data);
    }

    async getAll() {
        return await Categories.find();
    }

    async getOne(id) {
        return await Categories.findById(id);
    }

    async update(id, data) {
        return await Categories.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Categories.findByIdAndDelete(id);
    }
}

export default new CategoriesService();