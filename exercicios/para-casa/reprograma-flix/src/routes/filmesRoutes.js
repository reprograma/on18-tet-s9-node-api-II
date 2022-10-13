const controller = require("../controllers/filmesController")

const express = require("express")
const router = express.Router()

router.get("/catalogo", controller.getAll)

router.get("/pesquisar/:id", controller.getById)

router.get("/pesquisar", controller.getTitle)

router.get("/catalogo/busca", controller.getByGenre)

module.exports = router