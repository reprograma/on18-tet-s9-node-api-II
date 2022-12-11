//pegar os itens de controller
const controller=require("../controllers/filmesController")

//Montar as rotas
const express = require("express");

const router = express.Router();

//Rotas
router.get("/catalogo", controller.getAll);

router.get("/busca/:id", controller.buscaId);

router.get("/buscapornome", controller.FilmePorNome);

router.post("/cadastro/novofilme", controller.novoFilme);

router.delete("/deletar/:id", controller.deletarFilme);

router.put("/atualizar/put/:id",controller.fazerPut);

router.patch("/atualizar/titulo/:id", controller.atualizarTitulo);

router.patch("/atualizar/tudo/:id", controller.atualizarTudo);
//exportar
module.exports = router;