const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

// Post /api/auth/register
router.post("/register", AuthController.register);

// Post /api/auth/login
router.post("/login", AuthController.login);

module.exports = router;
