const { User } = require("../models");
const { comparePassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");

class AuthController {
  // Register a new user
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const newUser = await User.create({ name, email, password });

      res.status(201).json({
        statusCode: 201,
        data: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  // Login an existing user
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw new Error("EmptyEmail");
      if (!password) throw new Error("EmptyPassword");

      const user = await User.findOne({ where: { email } });
      const validPassword = comparePassword(password, user?.password);
      if (!user || !validPassword) {
        throw new Error("InvalidUser");
      }

      const payload = {
        id: user.id,
        name: user.name,
      };

      const token = generateToken(payload);

      res.status(200).json({
        statusCode: 200,
        access_token: token,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
