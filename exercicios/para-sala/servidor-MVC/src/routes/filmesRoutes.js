// as rotas e metodos dos filmes

const controller = require ("../controllers/filmesController")
//invocar o express
const express = require("express")
//função de toas do express
const router = express.Router()
//router.METODO(rota,função)
router.get("/catalogo", controller.getAll)

router.get("/pesquisar/:id", controller.getByID)
//exportar para ser usado no app.js
module.exports = router