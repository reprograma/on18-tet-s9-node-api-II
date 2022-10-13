//invocar Controller
const controller = require("../controllers/seriesController")
//invocar express
const express = require("express")
//rotas express
const router = express.Router()
//router+HTTP -> função
router.get("/catalogo",controller.getAll)
router.get("/pesquisar/:id", controller.getById)
//exportar
module.exports = router