const { getConnection } = require("../models/connector");

const hasAuth = async (req, res, next) => {
  const id = Number(req.params.id);
  const [results] = await getConnection().execute(
    `SELECT * FROM todo WHERE id =?`,
    [id]
  );
  if (results.length === 0) {
    return res.status(400).json("no todo");
  }
  if (results[0].authorId !== req.user.id) {
    return res.status(401).json("no auth");
  }
  next();
};

module.exports = { hasAuth };
