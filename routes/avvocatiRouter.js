const express = require("express");
const router = express.Router();
const avvocatoController = require("./../controllers/avvocatoController");

router
  .get("/", avvocatoController.getAllAvvocato)
  .get("/:id", avvocatoController.getAvvocato);

router
  .post("/", avvocatoController.createAvvocato)
  .post("/all", avvocatoController.createAll)
  .patch("/:id", avvocatoController.updateAvvocato)
  .delete("/:id", avvocatoController.deleteAvvocato);

module.exports = router;
