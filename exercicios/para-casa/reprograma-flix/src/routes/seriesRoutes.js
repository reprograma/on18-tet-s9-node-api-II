const controller = require("../controllers/seriesControllers")

const express = require("express")

const router = express.Router()

router.get("/catalogo", controller.getAll)

router.get("/pesquisa/:id", controller.getById)

router.get("/pesquisa", controller.getByTitle)

router.get("/busca", controller.getByGenre)

router.post("/cadastrar", controller.cadastraSerie)

router.put("/update/generico/:id", controller.updateGenerico)

router.patch("/updateTitulo/:id",controller.updateTitulo)

router.put("/updateAll/:id", controller.updateAll)

module.exports = router