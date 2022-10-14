//ROTAS E METODOS DOS FILMES
//chamando a controller
const controller = require("../controllers/filmesController")

//chamando o express
const express = require("express")
//chamando função de rotas do express
const router = express.Router()

router.get("", controller.getAll)
router.get("/pesquisar/:id", controller.getById)
router.get("/pesquisar", controller.getByTitulo)
router.get("/buscar", controller.getByGenre)
router.post("/novo/filme", controller.createFilme)
router.patch("/atualizar/titulo/:id", controller.updateTitle)
router.put("/substituir/:id", controller.updateAll)
router.put("/update/generico/:id", controller.updateGenerico)
//exportando para usar no app.js
module.exports = router