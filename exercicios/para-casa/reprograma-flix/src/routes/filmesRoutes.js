const controller = require("../controller/filmesController")

 const express = require("express")


 const router = express.Router()


router.get("/Catalogo", controller.getAll)

router.get("/buscar/:id", controller.getById)
router.get("/pesquisar?:titulo", controller.getTitle)
router.get("/pesquisar?:genero", controller.getGenero)
router.post("/criar", controller.postCriar)
router.delete("/deletar/:id", controller.deLete)
router.patch("/update/:id", controller.paTC)
router.put("/update/generico/:id", controller.upDAT)
router.put("/update/total/:id",controller.PtAll)





module.exports = router