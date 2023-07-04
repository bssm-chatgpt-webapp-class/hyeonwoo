const express = require("express");
const router = express.Router();

const todoRouter = require("./todo");
const authRouter = require("./auth");

router.use("/todo", todoRouter);
router.use("/auth", authRouter);

module.exports = router;
