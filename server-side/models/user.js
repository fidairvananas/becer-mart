"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Userame field is required",
          },
          notEmpty: {
            msg: "Userame field is required",
          },
        },
      },
      businessName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Business Name field is required",
          },
          notEmpty: {
            msg: "Business Name field is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email field is required",
          },
          notEmpty: {
            msg: "Email field is required",
          },
          isEmail: {
            msg: "Must be an email format",
          },
        },
        unique: {
          args: true,
          msg: "Email must be unique",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password field is required",
          },
          notEmpty: {
            msg: "Password field is required",
          },
          len: {
            args: [8],
            msg: "Password must be at least 8 character",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Phone number field is required",
          },
          notEmpty: {
            msg: "Phone number is required",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Address field is required",
          },
          notEmpty: {
            msg: "Address field is required",
          },
        },
      },
    },
    {
      sequelize,
      hooks: {
        beforeCreate(user) {
          user.password = hashPassword(user.password);
        },
      },
      modelName: "User",
    }
  );
  return User;
};
