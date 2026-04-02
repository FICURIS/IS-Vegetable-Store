import Address from "../Models/Address.js";

class AddressService {
    async create(address) {
        return await AddressService.Create(address);
    }

    async getAll() {
        const addresses = await Address.find();
        return addresses;
}

    async getOne() {
        if (!id) {
            throw new Error('не указан ID')
        }
           const address = await Address.findById(id)
        return address;
    }

    async update(address) {
        if(!address._id) {
            throw new Error('не указан ID')
        }
        const udpatedAddress = await Address.findByIdAndUpdate(address._id, address, {new: true})
        return updateAddress
    }

    async delete(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const address = await Address.findByIdAndDelete(id)
        return address
    }
}

export default new AddressService