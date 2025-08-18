const { User } = require("../../models");
const { comparePassword } = require("../../helpers/bcrypt");
const { signToken } = require("../../helpers/jwt");

class UserController {
  static userRegister = async (req, res, next) => {
    try {
      const { userName, businessName, email, password, phoneNumber, address } =
        req.body;

      const findEmail = await User.findOne({
        where: {
          email,
        },
      });

      if (!findEmail) {
        await User.create({
          userName,
          businessName,
          email,
          password,
          phoneNumber,
          address,
        });

        res.status(201).json({ message: "Register successfully!" });
      } else {
        throw {
          code: 400,
          name: "Bad Request",
          message:
            "This email address is already associated with another account.",
        };
      }
    } catch (error) {
      next(error);
    }
  };

  static userLogin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (user) {
        const checkPass = comparePassword(password, user.password);
        if (checkPass) {
          const payload = { id: user.id, email: user.email };
          const access_token = signToken(payload);
          res.status(200).json({ message: "Login successfull!", access_token });
        } else {
          throw {
            code: 401,
            name: "Unauthorized",
            message: "Invalid email or password",
          };
        }
      } else {
        throw {
          code: 401,
          name: "Unauthorized",
          message: "Invalid email or password",
        };
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;
