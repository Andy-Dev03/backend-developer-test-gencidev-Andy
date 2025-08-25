const { User } = require("../models");
const { comparePassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");

class AuthController {
  // Register a new user
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const newUser = await User.create({ username, email, password });

      res.status(201).json({
        statusCode: 201,
        message: "Registered successfully",
        data: {
          id: newUser.id,
          username: newUser.username,
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

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) throw new Error("InvalidEmailFormat");

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error("InvalidUser");
      }

      const validPassword = comparePassword(password, user.password);
      if (!user || !validPassword) {
        throw new Error("InvalidUser");
      }

      const payload = {
        id: user.id,
        username: user.username,
      };

      const token = generateToken(payload);

      res.status(200).json({
        statusCode: 200,
        message: "Login successful",
        data: {
          access_token: token,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
