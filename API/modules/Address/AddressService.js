import Address from "./Address.js";

class AddressService {
    async create(data) {
        return await Address.create(data);
    }

    async getAll() {
        return await Address.find();
    }

    async getOne(id) {
        return await Address.findById(id);
    }

    async update(id, data) {
        return await Address.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );
    }

    async delete(id) {
        return await Address.findByIdAndDelete(id);
    }
}

export default new AddressService();