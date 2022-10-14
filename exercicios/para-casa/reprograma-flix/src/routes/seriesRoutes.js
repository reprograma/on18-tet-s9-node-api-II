const controller = require("../controllers/seriesController")

const express = require("express")

const router = express.Router()

router.get("/catalogo", controller.getAll)

router.get("/pesquisar/:id", controller.getById)

router.get("/catalogo/buscar", controller.getByGenre)

module.exports = router