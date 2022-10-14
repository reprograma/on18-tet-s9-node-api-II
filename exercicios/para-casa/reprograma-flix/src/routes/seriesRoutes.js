const controller = require("../controllers/seriesController")

const express = require("express")
const router = express.Router()

router.get("/catalogo", controller.getAll)

router.get("/pesquisar/:id", controller.getById)

router.get("/pesquisar", controller.getByTitle)

router.get("/catalogo/busca", controller.getByGenre)

router.post("/cadastrar", controller.cadastrarNovaSerie)

router.patch("/updatetitulo/:id", controller.updateTitulo)

module.exports = router
