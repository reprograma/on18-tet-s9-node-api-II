const controller = require("../controllers/seriesController")

const express = require("express")

const router = express.Router()

router.get("/series", controller.getAll)
router.get("/series/pesquisar/titulo", controller.getByTitle)
router.get("/series/pesquisar/:id", controller.getById)
router.get("/pesquisar/genero", controller.getByGenre)

router.post("/series/cadastrar", controller.cadastrarNovaSerie)

router.patch("/series/editar/titulo", controller.editarTitulo)

router.put("/series/substituir/:id", controller.substituirSeriePorId)
router.put("/series/update/generico/:id", controller.updateGenerico)


module.exports = router 
