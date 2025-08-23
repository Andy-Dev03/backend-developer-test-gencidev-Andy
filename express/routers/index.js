const express = require("express");
const router = express.Router();
const authRouter = require("./authRouter");
const noteRouter = require("./noteRouter");

router.use("/auth", authRouter);
router.use("/notes", noteRouter);

module.exports = router;
