const express = require ("express")

const filmesRoutes = require ("./routes/filmesRoutes")
const seriesRoutes = require ("./routes/seriesRoutes")

const app = express ()

app.use(express.json())

//criando rota raiz de filmes
app.use("/filmes", filmesRoutes)
//exportar app para ser usado no server.js
app.use("/series", seriesRoutes)
module.exports = app