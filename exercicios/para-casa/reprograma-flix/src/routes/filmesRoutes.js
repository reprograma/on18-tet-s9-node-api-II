const controller = require("../controllers/filmesController")

const express = require("express")
const router = express.Router()

router.get("/catalogo", controller.getAll)

router.get("/pesquisar/:id", controller.getById)

router.put("/update/dados/:id", controller.updateDados)

module.exports = router