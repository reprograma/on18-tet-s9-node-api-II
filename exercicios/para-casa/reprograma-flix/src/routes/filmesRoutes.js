// AS ROTAS E METODOS DOS FILMES
//chamando a controller
const controller = require("../controllers/filmesController")

//chamar o express
const express = require("express")

//função de rotas do express
const router = express.Router()

//router.metodo http (rota,função)
router.get("/catalogo", controller.getAll)

router.get("/pesquisar", controller.getTitle) 

router.get("/catalogo/:id", controller.getId)

router.get("/filtrar", controller.getGenre)

router.post("/update", controller.updateCadastro)

router.patch("/update/:id", controller.updateTitle)

router.delete("/delete/:id", controller.deleteFilme)

//exportar
module.exports = router