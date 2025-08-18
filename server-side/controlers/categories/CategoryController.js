const { Category } = require("../../models");

class CategoryController {
  static getAllCategory = async (req, res, next) => {
    try {
      const result = await Category.findAll();
      res.status(200).json(result);
    } catch (error) {
      console.log("INI ERROR    " + error);
      next(error);
    }
  };

  static addCategory = async (req, res, next) => {
    try {
      const { name } = req.body;

      await Category.create({
        name,
      });

      res.status(201).json({ message: "Successfully" });
    } catch (error) {
      next(error);
    }
  };

  static editCategory = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const findCategory = await Category.findByPk(id);
      if (findCategory) {
        const editCategory = await Category.update(
          {
            name,
          },
          {
            where: {
              id: id,
            },
            returning: true,
          }
        );
        res.status(201).json({
          message: "Success updated !",
          data: editCategory[1][0],
        });
      } else {
        throw {
          code: 404,
          name: "Not Found",
          message: "Category not found",
        };
      }
    } catch (error) {
      next(error);
    }
  };

  static deleteCategory = async (req, res, next) => {
    try {
      const { id } = req.params;

      const findCategory = await Category.findByPk(id);
      if (findCategory) {
        await Category.destroy({
          where: {
            id: id,
          },
        });
        res.status(201).json({
          message: "Success deleted !",
        });
      } else {
        throw {
          code: 404,
          name: "Not Found",
          message: "Category not found",
        };
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = CategoryController;
