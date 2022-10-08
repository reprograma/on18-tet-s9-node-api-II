// AS ROTAS E METODOS DOS FILMES
//invoquei a controller
const controller = require("../controllers/filmesController")

//invocar o express
const express = require("express")

//função de rotas do express
const router = express.Router()

//router.METODO(rota, função)
router.get("/catalogo", controller.getAll)

router.get("/pesquisar/:id", controller.getById)


//exportar para ser usado no app.js
module.exports = router