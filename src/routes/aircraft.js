function aircraft () {
  let router = require("express").Router();
  router.get("/", function (req, res) {
    res.send("get all aircrafts");
  });

  router.get("/:id", function (req, res) {
    res.send("get aircraft by id");
  });
  return router;
}

module.exports = aircraft();
