const controller = require("../controllers/seriesController");
const express = require("express");
const router = express.Router();

router.get("/catalogo", controller.getAll);
router.get("/catalogo/busca", controller.getByGenre);
router.put("/update/generico/:id", controller.updateGenerico);
router.patch("/editar/:id", controller.patchEditar);
router.get("/pesquisar/titulo", controller.getByTitle);
router.post("/editar/:id", controller.postBySerie);
module.exports = router;