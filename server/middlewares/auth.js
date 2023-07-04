const jwt = require("jsonwebtoken");
const { getConnection } = require("../models/connector");
const env = require("../config/env");

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const tokenResult = jwt.verify(token, env.jwtSecret);
    const [results] = await getConnection().execute(
      `SELECT * FROM user WHERE id=?`,
      [tokenResult.id]
    );

    if (results.length === 0) {
      return res.status(401).json("no user");
    }

    req.user = results[0];

    next();
  } catch (error) {
    console.log("error : ", error);
    return res.status(403).json("invalid token");
  }
};

module.exports = { validateToken };
