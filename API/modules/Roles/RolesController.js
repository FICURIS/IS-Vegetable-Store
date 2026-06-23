import RolesService from "./RolesService.js";

class RolesController {
    async create(req, res) {
        const { name } = req.body;

        try {
            if (!name) {
                return res.status(400).json({
                    error: "Название роли обязательно"
                });
            }

            const role = await RolesService.create({ name });
            res.json(role);
        } catch (e) {
            res.status(500).json({
                error: `Ошибка создания роли: ${e.message}`
            });
        }
    }

    async getAll(req, res) {
        try {
            const roles = await RolesService.getAll();
            res.json(roles);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async getOne(req, res) {
        const { id } = req.params;

        try {
            const role = await RolesService.getOne(id);

            if (!role) {
                return res.status(404).json({
                    error: "Роль не найдена"
                });
            }

            res.json(role);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async update(req, res) {
        const { id } = req.params;

        try {
            const updatedRole = await RolesService.update(id, req.body);
            res.json(updatedRole);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            const deletedRole = await RolesService.delete(id);

            if (!deletedRole) {
                return res.status(404).json({
                    error: "Роль не найдена"
                });
            }

            res.json({
                message: "Роль удалена",
                role: deletedRole
            });
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }
}

export default new RolesController();