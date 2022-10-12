// Rotas e metodos dos filmes.
const controller = require("../controllers/filmesControllers")
//invocar o express
const express = require("express")
//função para construir rota
const router = express.Router()
//solic. rota/nomedarota/usa função controller
router.get("/catalogo", controller.getAll)

router.get("/pesquisar/:id", controller.getById)

router.get("/pesquisar", controller.getFilterTitle)

router.get("/catalogo/genero", controller.getByGenre)

router.post("/cadastrar", controller.postFilmes)

router.put("/substituir/:id", controller.substituirFilme)

router.patch("/editar/:id", controller.updateTitulo)


//exports os routers para ser usado no app.js
module.exports = router