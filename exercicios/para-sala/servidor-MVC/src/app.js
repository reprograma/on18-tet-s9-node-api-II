//CENTRALIZA O CONTEUDO DA APLICAÇÃO
//ROTAS RAIZES

const express = require("express")

const filmesRoutes = require("./routes/filmesRoutes")
const seriesRoutes = require("./routes/seriesRoutes")

const app = express()

app.use(express.json())

app.use("/filmes", filmesRoutes)

app.use("/series", seriesRoutes)

//exportar app para ser usado no server.js
module.exports = app 