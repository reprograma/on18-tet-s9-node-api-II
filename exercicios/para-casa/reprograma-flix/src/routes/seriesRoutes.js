const controller = require ("../controllers/seriesController")

const express = require("express")
const router = express.Router()

router.get("/catalogo", controller.getAll)

router.get("/pesquisar/:id", controller.getById)

router.get("/pesquisar", controller.getTitle)

router.get("/catalogo/pesquisar", controller.getByGenero)

module.exports = router