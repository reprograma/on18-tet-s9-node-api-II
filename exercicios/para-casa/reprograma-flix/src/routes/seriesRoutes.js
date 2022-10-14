// CONTÉM TODAS AS ROTAS E METODOS DAS SERIES

// INVOCAR A CONTROLLER
const controller = require("../controllers/seriesController")

// INVOCAR O EXPRESS
const express = require("express")
const { Router } = require("express")

// FUNÇÃO DE TODAS AS ROTAS DO EXPRESS
const router = express.Router()

// router.metodo(rota, funcão)
router.get("/catalogo", controller.getAll)

router.get("/pesquisar/:id", controller.getById)

router.get("/pesquisar", controller.getByTitle)

router.get("/catalogo/buscar/", controller.getByGenero)

router.post("/cadastrar", controller.postSerieNova)

router.patch("/editar/:id", controller.patchNewtitulo)

router.put("/atualizar/:id", controller.putSerieCompleta)

router.put("/update/:id", controller.putGenerico)



// EXPORTAR PARA USÁ-LO NO APP.JS
module.exports = router
