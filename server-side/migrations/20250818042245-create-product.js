"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      code: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      priceBuy: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      priceSell: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      diskon: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
      },
      margin: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      unit: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "pcs",
      },
      expirydate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("active", "inactive", "preorder"),
        allowNull: false,
        defaultValue: "active",
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users", // pastikan table User sudah ada
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      categoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Categories", // pastikan table Category sudah ada
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
