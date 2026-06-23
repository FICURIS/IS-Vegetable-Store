import AddressService from "./AddressService.js";

class AddressController {
    async create(req, res) {
        const {
            IdUsers,
            City,
            Street,
            House,
            Apartment
        } = req.body;

        try {
            const address = await AddressService.create({
                IdUsers,
                City,
                Street,
                House,
                Apartment
            });

            res.json(address);
        } catch (e) {
            res.status(500).json({
                error: `Ошибка создания адреса: ${e.message}`
            });
        }
    }

    async getAll(req, res) {
        try {
            const addresses = await AddressService.getAll();
            res.json(addresses);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async getOne(req, res) {
        const { id } = req.params;

        try {
            const address = await AddressService.getOne(id);

            if (!address) {
                return res.status(404).json({
                    error: "Адрес не найден"
                });
            }

            res.json(address);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const data = req.body;

        try {
            const updatedAddress = await AddressService.update(id, data);
            res.json(updatedAddress);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            await AddressService.delete(id);

            res.json({
                message: "Адрес удален"
            });
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }
}

export default new AddressController();