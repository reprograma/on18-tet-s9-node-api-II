const controller = require("../controllers/filmesController")

const express = require("express")

const router = express.Router()

router.get("/filmes", controller.getAll)
router.get("/filmes/pesquisar/titulo", controller.getByTitle)
router.get("/filmes/pesquisar/:id", controller.getById)
router.get("/filmes/pesquisar/genero", controller.getByGenre)

router.post("/filmes/cadastrar", controller.cadastrarNovoFilme)

router.patch("/filmes/editar/titulo", controller.editarTitulo)

router.put("/filmes/substituir/:id", controller.substituirFilmePorId)
router.put("/filmes/update/generico/:id", controller.updateGenerico)


module.exports = router 