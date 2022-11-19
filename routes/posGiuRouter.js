const express = require("express");
const router = express.Router();
const posgiuController = require("./../controllers/posGiuController");

router
  .get("/", posgiuController.getAllPosGiu)
  .get("/:id", posgiuController.getPosGiu);

router
  .post("/", posgiuController.createPosGiu)
  //.post("/all", posgiuController.createAll)
  .patch("/:id", posgiuController.updatePosGiu)
  .delete("/:id", posgiuController.deletePosGiu);

module.exports = router;
