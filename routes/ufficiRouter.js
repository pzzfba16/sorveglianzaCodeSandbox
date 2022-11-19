const express = require("express");
const router = express.Router();
const ufficiController = require("./../controllers/ufficiController");

router
  .get("/", ufficiController.getAllUffici)
  .get("/:id", ufficiController.getUfficio);

router
  .post("/", ufficiController.createUfficio)
  .patch("/:id", ufficiController.updateUfficio)
  .delete("/:id", ufficiController.deleteUfficio);

module.exports = router;
