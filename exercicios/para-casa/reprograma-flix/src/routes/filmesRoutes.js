// rotas e metodos dos filmes 
// invoquei a controller
const controller = require("../controllers/filmesController")

const express = require("express")
const router = express.Router()

router.get("/catalogo", controller.getAll)

router.get("/pesquisar/:id", controller.getById)

router.get("/pesquisar", controller.getTitle)

router.get("/catalogo/busca", controller.getByGenre)

router.post("/cadastrar", controller.postNovoFilme)

router.patch("/update/titulo/:id", controller.updateTitulo)

router.put("/catalogo/update/completo/:id", controller.updateCompleto)

router.put("/update/generico/:id", controller.updateGenerico)





module.exports = router