//invoquei a controller
const controller = require("../controllers/filmesController")

//invocar o express
const express = require("express")

//função de rotas do express
const router = express.Router()

//router.METODO(rota, função)
router.get("/catalogo", controller.getAll)

router.get("/pesquisar/:id", controller.getById)

router.get("/pesquisar", controller.getByTitulo)

router.get("/catalogo/pesquisar", controller.getByGenero)

router.post("/cadastrar", controller.postNovoFilme)

router.patch("/update/titulo/:id", controller.updateTitulo)

router.put("/catalogo/update/completo/:id", controller.updateCompleto)

router.put("/update/generico/:id", controller.updateGenerico)


//exportar para ser usado no app.js
module.exports = router