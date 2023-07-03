const express = require("express");
const router = express.Router();

let currentId = 1;
let database = [];

router.get("/", (req, res) => {
  res.json(database);
});

router.post("/", (req, res) => {
  const data = req.body;
  database.push({ id: currentId++, text: data.text });
  return res.json("success");
});

router.put("/:id", (req, res) => {
  // database.filter((data) => {
  //   if (data.id === Number(req.params.id)) {
  //     data.text = req.body.text;
  //   }
  // });
  const updateIndex = database.findIndex(
    (item) => item.id === Number(req.params.id)
  );
  database[updateIndex].text = req.body.text;
  return res.json("success");
});

router.delete("/:id", (req, res) => {
  database = database.filter((item) => item.id !== Number(req.params.id));
  return res.json("success");
});

module.exports = router;
