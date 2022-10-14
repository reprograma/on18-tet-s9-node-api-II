//CENTRALIZA O CONTEUDO DA APLICAÇÃO
//ROTAS RAIZES

const express = require("express");

const filmesRoutes = require("./routes/filmesRoutes");
const seriesRoutes = require("./routes/seriesRoutes");
const commonRoute = require("./routes/commonRoute")

const app = express();

app.use(express.json());

//rota raiz padrão
app.use("/", commonRoute);

//criando rota raiz de filmes
app.use("/movies", filmesRoutes);

//criando a rota raiz de series
app.use("/series", seriesRoutes);

//exportar app para ser usado no server.js
module.exports = app;