const controller = require("../controllers/controllerSeries")

const express = require("express")

const router = express.Router()

router.get("/catalogo", controller.recuperaSeries)

router.get("/catalogo/:id", controller.recuperaSeriePeloId)

router.get("/catalogo?titulo:value", controller.recuperaSeriePeloTitulo)

router.post("/cadastrar", controller.criarSerie)

router.delete("/deletar/:id", controller.deletarSerie)

router.put("/atualizar/:id", controller.atualizarSeriePeloId)

router.patch("/atualizarTitulo/:titulo", controller.atualizarTitulo)

router.patch("/atualizarSerie/:id", controller.atualizarSeriePeloBody)

module.exports = router;
