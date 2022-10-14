const controller = require("../controllers.js/filmesController")

const express = require("express")

//FUNÇÃO DE ROTAS DO EXPRESS

const router = express.Router()

router.get("/catalogo", controller.getAll)
router.get("/catalogo/:id",controller.getById)
router.get("/catalogo/busca", controller.getByGenre)
router.get("/catalogo/busca", controller.getByTitle)
router.put("/update/:id", controller.updateGenerico)
router.post("/cadastrar", controller.postFilme)
router.patch("/editar/:id", controller.patchNome)
router.put("/atualizacao/:id", controller.putfilme)

module.exports = router