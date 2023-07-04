const jwt = require("jsonwebtoken");
const { getConnection } = require("../models/connector");

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const tokenResult = jwt.verify(token, "secret");
    const [results] = await getConnection().execute(
      `SELECT * FROM user WHERE id =?`,
      [tokenResult.id]
    );

    if (results.length === 0) {
      return res.status(401).json("no user");
    }

    req.user = results[0];

    // 사용자도 있고 토큰도 정상
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json("invalid token");
  }
};

module.exports = { validateToken };
