const controller = require("../controllers/filmesController")

const express = require("express")

const router = express.Router()

router.get("/catalogo", controller.getAll)

router.get("/pesquisar/:id", controller.getById)

router.get("/pesquisar", controller.getByTitle)

router.get("/catalogo/busca", controller.getByGenre)

router.post("/cadastrar", controller.cadastrarNovoFilme)

router.patch("/updatetitulo/:id", controller.updateTitulo)

router.put("/updatefilme/:id", controller.updateFilme)

router.put("/update-generico/:id", controller.updateGenerico)

module.exports = router