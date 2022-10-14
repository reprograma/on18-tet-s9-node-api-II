const controller = require("../controllers/controllerFilmes")

const express = require("express")

const router = express.Router();

router.get("/catalogo", controller.recuperaFilmes)

router.get("/catalogo/:id", controller.recuperaFilmePeloId)

router.get("/catalogo?titulo=:value", controller.recuperaFilmePeloTitulo)

router.post("/cadastrar", controller.criarFilme)

router.delete("/deletar/:id", controller.deletarFilme)

router.put("/atualizar/:id", controller.atualizarFilmePeloId)

router.patch("/atualizarTitulo/:titulo", controller.atualizarTitulo)

router.patch("/atualizarFilme/:id", controller.atualizarFilmePeloBody)

module.exports = router;
