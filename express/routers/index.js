const express = require("express");
const router = express.Router();
const authRouter = require("./authRouter");
const noteRouter = require("./noteRouter");
const { authentication } = require("../middlewares/middleware");

router.use("/auth", authRouter);

// Apply authentication middleware to all routes below
router.use(authentication);

router.use("/notes", noteRouter);

module.exports = router;
