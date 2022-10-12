// Rotas e métodos dos filmes

// Invocando o controller de filmes
const controller = require("../controllers/filmesController")

// Invocando o express 
const express = require("express")

// Função de rotas do express
const router = express.Router()


// Para fazer as rotas

//router.METODO(rota, função) 
router.get("/catalogo", controller.getAll)

// METODO GET
// por ID
router.get("/pesquisar/:id", controller.getById)

// por Titulo
router.get("/pesquisar", controller.getByTitle)

// por genero
router.get("/buscar", controller.getByGenre)

// METODO POST
router.get("/cadastrar", controller.postMovie)

// METODO PUT 
router.put("/update/generico/:id", controller.updateGenerico)

// METODO PUT 
router.patch("/editar/:id", controller.patchEdit)

// Exportar para ser usado no app.js
module.exports = router
