const controller = require("../controllers/filmesControllers")

const express = require("express")

const router = express.Router()


router.get("/catalogo", controller.getAll)

router.get("/pesquisa/:id", controller.getById)

router.get("/pesquisa", controller.getByTitle)

router.get("/busca", controller.getByGenre)

router.post("/cadastrar", controller.addFilmes)

router.put("/update/generico/:id", controller.updateGenerico)

router.patch("/updateTitulo/:id", controller.updateTitle)

router.put("/updateAll/:id", controller.updateAll)

module.exports = router