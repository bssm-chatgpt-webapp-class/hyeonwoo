const express = require("express");
const router = express.Router();
const { getConnection } = require("../models/connector");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/signin", async (req, res) => {
  const { email, pw } = req.body;
  const [results] = await getConnection().query(
    `SELECT * FROM user WHERE email =?`,
    [email]
  );
  if (results.length === 0) {
    return res.json("no user");
  }
  if (!bcrypt.compareSync(pw, results[0].pw)) {
    return res.json("wrong password");
  }
  const token = jwt.sign(
    { id: results[0].id, email, exp: Math.floor(Date.now() / 1000) + 60 * 60 }, // exp: 1hour
    process.env.JWT_SECRET
  );
  res.json(token);
});

router.post("/signup", async (req, res) => {
  const { email, pw } = req.body;
  const encryptedPw = await bcrypt.hash(pw, 10);
  await getConnection().query(`INSERT INTO user(email, pw) VALUES (?,?)`, [
    email,
    encryptedPw,
  ]);
  res.json("success");
});

module.exports = router;
