const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

// Post /auth/register
router.post("/register", AuthController.register);

// Post /auth/login
router.post("/login", AuthController.login);

module.exports = router;
