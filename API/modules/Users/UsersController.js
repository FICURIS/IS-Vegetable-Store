import UsersService from "./UsersService.js";

class UsersController {
    async create(req, res) {
        const {
            Username,
            Password,
            Email,
            Phone
        } = req.body;

        try {
            const user = await UsersService.create({
                Username,
                Password,
                Email,
                Phone
            });

            res.json(user);
        } catch (e) {
            res.status(500).json({
                error: `Ошибка создания пользователя: ${e.message}`
            });
        }
    }

    async getAll(req, res) {
        try {
            const users = await UsersService.getAll();
            res.json(users);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async getOne(req, res) {
        const { id } = req.params;

        try {
            const user = await UsersService.getOne(id);

            if (!user) {
                return res.status(404).json({
                    error: "Пользователь не найден"
                });
            }

            res.json(user);
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
            const updatedUser = await UsersService.update(id, data);
            res.json(updatedUser);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            await UsersService.delete(id);

            res.json({
                message: "Пользователь удален"
            });
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }
}

export default new UsersController();