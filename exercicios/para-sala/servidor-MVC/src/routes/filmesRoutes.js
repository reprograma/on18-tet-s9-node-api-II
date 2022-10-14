//As rotas e metodos dos filmes
//Invoquei a controller

const controller = require("../controllers/filmesController")

//invocar o express
const express = require("express"
)

//função de rotas do express
const router = express.Router()

//router.METODOHTPP(rota, função)
router.get("/catalogo", controller.getAll)

//exportar para ser usado no app.js
module.exports = router