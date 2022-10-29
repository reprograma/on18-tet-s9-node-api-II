const controller = require("../controllers/seriesController")

const express = require("express")

const router = express.Router()

router.get("/catalogo", controller.getAll)
router.get("/pesquisar", controller.getByTitle)
router.get("/pesquisar/:id", controller.getById)
router.get("/buscar", controller.getByGenre)
router.post("/cadastrar", controller.postNewSeries)
router.put("/modificar/:id", controller.putUpdateGenerico)
router.patch("/update/:id", controller.patchTitle)
router.put("/substituir/:id", controller.putInfo)



module.exports = router