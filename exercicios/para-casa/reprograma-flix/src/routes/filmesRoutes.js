//invocar filmesController.js
const controller = require("../controllers/filmesController")
//invocar express
const express = require("express")
//função rotas do express
const router = express.Router()
//router relaciona método http com funções
router,get("/catalogo-completo",controller.getAllBoth)
router.get("/catalogo", controller.getAll)
router.get("/pesquisar/:id", controller.getById)
//exportar rotas
module.exports=router