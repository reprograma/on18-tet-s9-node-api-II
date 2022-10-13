// centraliza o conteudo da aplicação
// rotas raizes

const express = require("express")

const filmesRoutes = require("./routes/filmesRoutes")
const seriesRoutes = require("./routes/seriesRoutes")
const app = express()

app.use(express.json())

//criando raizes
app.use("/filmes", filmesRoutes)

// criando rota raiz de filmes
app.use("/series", seriesRoutes)

//exportar app para ser usado no server.js
module.exports = app
