const controller = require("../controllers/filmesController") 

const express = require("express")


const router = express.Router() 


router.get("/catalogo", controller.getAll)

router.get("/filter", controller.getByGender)

router.get("/catalogo/:id", controller.getById)

router.post("/criar", controller.createMovie)

router.put("/update-generico/:id", controller.updateQualquerCoisa)

router.patch("/update/:id", controller.updateTitle)

router.put("/update/:id", controller.updateMovie)

router.delete("/delete/:id", controller.deleteMovie)


module.exports = router