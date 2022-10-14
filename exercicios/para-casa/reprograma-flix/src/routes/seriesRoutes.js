const controller = require("../controllers/seriesController")

const express = require("express")

const router = express.Router()

router.get("", controller.getAll)
router.get("/pesquisar/:id", controller.getById)
router.get("/pesquisar", controller.getByTitulo)
router.get("/buscar", controller.getByGenre)
router.post("/cadastrar", controller.createSerie)
router.patch("/atualizar/titulo/:id", controller.updateTitle)
router.put("/substituir/:id", controller.updateAll)
router.put("/update/generico/:id", controller.updateGenerico)

module.exports = router