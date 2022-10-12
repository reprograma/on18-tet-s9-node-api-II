// Rotas e métodos das series

// Invocando o controller de series
const controller = require("../controllers/seriesController")

// Invocando o express 
const express = require("express")

// Função de rotas do express
const router = express.Router()


// Para fazer as rotas

//router.METODO(rota, função) 
router.get("/catalogo", controller.getAll)

// por ID
router.get("/pesquisar/:id", controller.getById)

// por Titulo
router.get("/pesquisar", controller.getByTitle)

// por Titulo
router.get("/buscar", controller.getByGenre)

// METODO POST
router.get("/cadastrar", controller.postSerie)

// METODO PUT 
router.put("/update/generico/:id", controller.updateGenerico)

// METODO PATCH
router.patch("/updatetitulo/:id", controller.patchEdit)

// Exportar para ser usado no app.js
module.exports = router