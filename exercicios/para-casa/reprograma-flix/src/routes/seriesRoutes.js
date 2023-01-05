const controller = require("../controllers/seriesControllers")

const express = require("express")

const router = express.Router()

router.get("/catalogo", controller.getAll)

router.get("/pesquisar", controller.getFilterTitle)

router.get("/pesquisar/:id", controller.getById)

router.get("/catalogo/genero", controller.getByGenre)

router.post("/cadastrar", controller.postSerie)

router.put("/substituir/:id", controller.substituirSerie)

router.patch("/editar/:id", controller.updateTitulo)


module.exports = router