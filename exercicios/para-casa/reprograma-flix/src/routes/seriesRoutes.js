const controller = require("../controllers/seriesController")

const express = require("express")


const router = express.Router()

//router.METODO(rota, função)
router.get("/catalogo", controller.getAll)

router.get("/pesquisar/:id", controller.getById)

router.get("/pesquisar", controller.getByTitulo)
router.get("/catalogo/pesquisar",controller.getByGenero)
router.post("/cadastrar", controller. postCadastrarSerie)
router.patch("/update/titulo/:id", controller.updateTitulo)
router.put("/catalogo/update/completo/:id", controller.updateCompleto)


router.put("/update/generico/:id", controller.updateGenerico)
module.exports = router