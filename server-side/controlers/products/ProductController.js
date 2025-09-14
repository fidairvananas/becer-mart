const { Product, User, Category } = require("../../models");

class ProductController {
  static getAllProduct = async (req, res, next) => {
    try {
      const userLogin = req.userLogin;
      const result = await Product.findAll({
        where: {
          userId: userLogin.id,
        },
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  static getProductById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await Product.findOne({
        where: {
          id,
        },
        include: [
          {
            model: User,
            as: "author",
            attributes: ["id", "name"],
          },
          {
            model: Category,
            as: "category",
            attributes: ["id", "name"],
          },
        ],
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  static addProduct = async (req, res, next) => {
    try {
      const {
        code,
        name,
        description,
        priceBuy,
        priceSell,
        diskon,
        stock,
        unit,
        expiryDate,
        status,
        categoryId,
      } = req.body;

      const user = req.userLogin;

      await Product.create({
        code,
        name,
        description,
        priceBuy,
        priceSell,
        diskon,
        stock,
        unit,
        expiryDate,
        status,
        userId: user.id,
        categoryId,
      });

      res.status(201).json({ message: "Successfully" });
    } catch (error) {
      next(error);
    }
  };

  static editProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { categoryId, title, content, image } = req.body;

      const findProduct = await Product.findByPk(id);
      if (findProduct) {
        const editProduct = await Product.update(
          {
            categoryId,
            title,
            content,
            image,
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
          data: editProduct[1][0],
        });
      } else {
        throw {
          code: 404,
          name: "Not Found",
          message: "Product not found",
        };
      }
    } catch (error) {
      next(error);
    }
  };

  static deleteProduct = async (req, res, next) => {
    try {
      const { id } = req.params;

      const findProduct = await Product.findByPk(id);
      if (findProduct) {
        await Product.destroy({
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
          message: "Product not found",
        };
      }
    } catch (error) {
      next(error);
    }
  };

  static getProductByCategoryId = async (req, res, next) => {
    try {
      const categoryId = req.query.id;
      console.log("ini dari query  " + categoryId);

      const result = await Product.findAll({
        where: {
          categoryId: categoryId,
        },
        include: [
          {
            model: User,
            as: "author",
            attributes: ["id", "username", "image"],
          },
          {
            model: Category,
            as: "category",
            attributes: ["id", "name"],
          },
        ],
      });

      if (result.length == 0) {
        throw {
          code: 404,
          name: "Not Found",
          message: "Product not found",
        };
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ProductController;
