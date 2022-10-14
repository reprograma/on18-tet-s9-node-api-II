const controllerMovie = require("../controllers/filmesController");
const controllerSerie = require("../controllers/seriesController");

//invocar o express
const express = require("express");

//função de rotas do express
const router = express.Router();

//router.METODO(rota, função)

router.get("", controllerMovie.getAll, controllerSerie.getAll);
//router.get("", controllerSerie.getAll);

module.exports = router;