("use strict");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Relasi Product ke User (pemilik/creator)
      Product.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      // Relasi Product ke Category
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category",
      });
    }
  }

  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Product code field is required",
          },
          notEmpty: {
            msg: "Product code field is required",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Product name field is required",
          },
          notEmpty: {
            msg: "Product name field is required",
          },
        },
      },
      description: DataTypes.TEXT,
      priceBuy: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price buy field is required",
          },
          notEmpty: {
            msg: "Price buy field is required",
          },
        },
      },
      priceSell: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price sell field is required",
          },
          notEmpty: {
            msg: "Price sell field is required",
          },
        },
      },
      diskon: DataTypes.DECIMAL(15, 2),
      margin: DataTypes.DECIMAL(15, 2),
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          notNull: {
            msg: "Stock field is required",
          },
          notEmpty: {
            msg: "Stock field is required",
          },
        },
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pcs",
        validate: {
          notNull: {
            msg: "Unit field is required",
          },
          notEmpty: {
            msg: "Unit field is required",
          },
        },
      },
      expiryDate: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM("active", "inactive", "preorder"),
        allowNull: false,
        defaultValue: "active",
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "Products",
      hooks: {
        beforeCreate: async (product, options) => {
          // Generate code otomatis jika belum ada
          if (!product.code) {
            // Misal kode random 6 digit
            const randomCode = Math.floor(100000 + Math.random() * 900000);
            product.code = `PRD-${randomCode}`;
          }

          // Hitung margin otomatis
          if (product.priceSell && product.priceBuy) {
            product.margin = product.priceSell - product.priceBuy;
          }
        },
      },
    }
  );

  return Product;
};
