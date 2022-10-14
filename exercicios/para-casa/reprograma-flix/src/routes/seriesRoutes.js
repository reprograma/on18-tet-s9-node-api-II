// AS ROTAS E METODOS DOS FILMES
//invoquei a controller
const controller = require("../controllers/seriesController")

//invocar o express
const express = require("express")

//funções e rotas do express
const router = express.Router()

//router.METODO(rota, função) ---> colocar aqui as rotas para o aplicativo:
router.get("/catalogo", controller.getAll)
router.get("/catalogo/busca/", controller.getByGenre)//ver aqui que retorna [] sera porque 
router.get("/pesquisar/:id", controller.getSeriesById)



//exportar para ser usado no app.js
module.exports = router