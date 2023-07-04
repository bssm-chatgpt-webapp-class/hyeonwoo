const express = require("express");
const router = express.Router();
const { getConnection } = require("../models/connector");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const [results] = await getConnection().execute(`SELECT * FROM todo`);
  res.json(results);
});

router.post("/", async (req, res) => {
  const data = req.body;
  const token = req.headers.authorization;
  try {
    const tokenResult = jwt.verify(token, "secret");
    await getConnection().execute(
      `INSERT INTO todo (todo, completed, authorId) VALUES (?,?,?)`,
      [data.todo, data.completed, data.authorId]
    );
    return res.json("success");
  } catch (error) {
    console.error(error);
    return res.status(403).json("invalid token");
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { todo, completed } = req.body;
  await getConnection().execute(
    `UPDATE todo SET todo =?, completed =? WHERE id =?`,
    [todo, completed, id]
  );
  return res.json("success");
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const token = req.headers.authorization;

  try {
    const tokenResult = jwt.verify(token, "secret");
    const currentId = tokenResult.id;

    const [results] = await getConnection().execute(
      `SELECT * FROM todo WHERE id =?`,
      [id]
    );

    if (results[0].authorId !== currentId) {
      return res.status(401).json("no auth");
    }

    await getConnection().execute(`DELETE FROM todo WHERE id =?`, [id]);
    return res.json("success");
  } catch (error) {
    console.error(error);
    return res.status(403).json("invalid token");
  }
});

module.exports = router;
