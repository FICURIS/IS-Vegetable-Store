import UsersRolesService from "./UsersRolesService.js";

class UsersRolesController {
    async create(req, res) {
        const {
            IdUsers,
            IdRoles
        } = req.body;

        try {
            const userRole = await UsersRolesService.create({
                IdUsers,
                IdRoles
            });

            res.json(userRole);
        } catch (e) {
            res.status(500).json({
                error: `Ошибка создания связи пользователь-роль: ${e.message}`
            });
        }
    }

    async getAll(req, res) {
        try {
            const usersRoles = await UsersRolesService.getAll();
            res.json(usersRoles);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async getOne(req, res) {
        const { id } = req.params;

        try {
            const userRole = await UsersRolesService.getOne(id);

            if (!userRole) {
                return res.status(404).json({
                    error: "Связь не найдена"
                });
            }

            res.json(userRole);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async update(req, res) {
        const { id } = req.params;

        try {
            const updatedUserRole = await UsersRolesService.update(id, req.body);
            res.json(updatedUserRole);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            const userRole = await UsersRolesService.delete(id);
            res.json(userRole);
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }
}

export default new UsersRolesController();