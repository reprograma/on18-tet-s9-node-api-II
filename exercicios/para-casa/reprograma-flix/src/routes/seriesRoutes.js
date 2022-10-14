const controller = require("../controllers/seriesController")

const express = require("express")

const router = express.Router()

router.get("/", controller.getAllSeries);
router.get("/:id/pequisabyId", controller.getSerieById);
router.get("/pesquisaPorTitulo", controller.getSerieByTitle);
router.get("/pesquisaPorGenero", controller.getSerieByGenre);
router.post("/cadastrar", controller.postSerie);
router.put("/update", controller.putSerie);
router.patch("/:id/editar", controller.patchSerie);
router.patch("/:id/editarTitulo", controller.patchTituloSerie);

module.exports = router;