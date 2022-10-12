//centraliza o conteudo da aplicaçõe db, controller e routes
//comporta todas as rotas raizes

const express = require("express")

const filmesRoutes = require("./routes/filmesRoutes")
const seriesRoutes = require("./routes/seriesRoutes")

const app = express()

app.use(express.json())

//criando rota raiz de filmes
app.use("/filmes", filmesRoutes)
app.use("/series", seriesRoutes)

//exporta todos os app para ser usando no server.js
module.exports = app