// CONTÉM TODAS AS ROTAS E METODOS DOS FILMES

// INVOCAR A CONTROLLER
const controller = require("../controllers/filmesController")

// INVOCAR O EXPRESS
const express = require("express")

// FUNÇÃO DE TODAS AS ROTAS DO EXPRESS
const router = express.Router()

// router.metodo(rota, funcão)
router.get("/catalogo", controller.getAll)

router.get("/pesquisar/:id", controller.getById)

router.get("/pesquisar", controller.getByTitulo)

// router.get("/catalogo/buscar/", controller.getByGenero)

router.post("/cadastrar", controller.postNewFilme)

router.patch("/editar/:id", controller.patchNovoTitulo)

router.put("/atualizar/:id", controller.putFilmes)

// router.put("/update/:id", controller.updateGenerico)

// EXPORTAR PARA USÁ-LO NO APP.JS
module.exports = router