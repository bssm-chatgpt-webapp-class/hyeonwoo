const express = require("express");
const router = express.Router();
const { getConnection } = require("../models/connector");
const jwt = require("jsonwebtoken");

router.post("/signin", async (req, res) => {
  const { email, pw } = req.body;
  const [results] = await getConnection().query(
    `SELECT * FROM user WHERE email =? AND pw =?`,
    [email, pw]
  );
  if (results.length === 0) {
    return res.json("no user");
  }
  const token = jwt.sign(
    { email, exp: Math.floor(Date.now() / 1000) + 60 * 60 }, // exp: 1hour
    "secret"
  );
  res.json(token);
});

router.post("/signup", async (req, res) => {
  const { email, pw } = req.body;
  await getConnection().query(`INSERT INTO user(email, pw) VALUES (?,?)`, [
    email,
    pw,
  ]);
  res.json("success");
});

module.exports = router;
