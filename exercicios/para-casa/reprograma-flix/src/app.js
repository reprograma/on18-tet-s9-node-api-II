const filmeRoutes = require("./routes/filmesRoutes");
const seriesRoutes = require("./routes/seriesRoutes");

//O básico de criação de servidor
const express = require("express");
const app = express();

app.use(express.json());

 //Rota raiz
 app.use("/filmes", filmeRoutes)

//No fim, exportar
module.exports = app;