"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // otomatis generate UUID v4
        primaryKey: true,
      },
      productCode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Product code field is required",
          },
          notEmpty: {
            msg: "Product code field is required",
          },
        },
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Product code field is required",
          },
          notEmpty: {
            msg: "Product code field is required",
          },
        },
      },
      description: DataTypes.STRING,
      stock: {
        type: DataTypes.NUMERIC,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Stock field is required",
          },
          notEmpty: {
            msg: "Stock field is required",
          },
        },
      },
      price: {
        type: DataTypes.NUMERIC,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price field is required",
          },
          notEmpty: {
            msg: "Price field is required",
          },
        },
      },
      salePrice: DataTypes.NUMERIC,
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
