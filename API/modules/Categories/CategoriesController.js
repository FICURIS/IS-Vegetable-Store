import CategoriesService from './CategoriesService.js';

class CategoriesController {
  async create(req, res) {
    const { name, description } = req.body;
    try {
      const category = await CategoriesService.create({ name, description });
      res.json(category);
    } catch (e) {
      res.status(500).json({ error: `Ошибка создания категории: ${e.message}` });
    }
  }

  async getAll(req, res) {
    try {
      const categories = await CategoriesService.getAll();
      res.json(categories);
    } catch(e) {
      res.status(500).json({ error: e.message });
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    try {
      const category = await CategoriesService.getOne(id);
      if (!category) {
        return res.status(404).json({ error: 'Категория не найдена' });
      }
      res.json(category);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const updatedCategory = await CategoriesService.update(id, data);
      res.json(updatedCategory);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      await CategoriesService.delete(id);
      res.json({ message: 'Категория удалена' });
    } catch(e) {
      res.status(500).json({ error: e.message });
    }
  }
}

export default new CategoriesController();