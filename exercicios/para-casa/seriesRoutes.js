const controller = require("../controllers.js/seriesController")

const express = require("express")

const router = express.Router()

router.get("/catalogo", controller.getAll)
router.get("/catalogo/:id", controller.getById)
router.get("/catalogo/busca", controller.getByGenre)
router.get("/catalogo/busca", controller.getByTitle)
router.put("/update/:id", controller.updateGenerico)
router.post("/cadastrar", controller.postFilme)
router.patch("/editar/:id", controller.patchNome)
router.put("/atualizacao/:id", controller.putSerie)

module.exports = router