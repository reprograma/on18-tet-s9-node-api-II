// As rotas e metodos dos filmes

const controller = require("../controllers/filmesController");

const express = require("express");
const { application } = require("express");

//função de rotas do express
const router = express.Router();

router.get("/catalogo", controller.getALL);


//exportar para ser usado no application.js
module.exports = router;