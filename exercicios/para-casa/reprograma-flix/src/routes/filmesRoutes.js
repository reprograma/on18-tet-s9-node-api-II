const controller = require("../controllers/filmesController")

const express = require("express")

const router = express.Router()

router.get("/", controller.getAllFilmes);
router.get("/:id/pequisabyId", controller.getFilmeById);
router.get("/pesquisaPorTitulo", controller.getFilmeByTitle);
router.get("/pesquisaPorGenero", controller.getFilmeByGenre);
router.post("/cadastrar", controller.postFilme);
router.put("/update", controller.putFilme);
router.patch("/:id/editar", controller.patchFilme);
router.patch("/:id/editarTitulo", controller.patchTituloFilme);

module.exports = router;