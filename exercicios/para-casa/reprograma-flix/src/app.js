//AQUI A GENTE CENTRALIZA OS CONTEÚDOS DE TODA A APLICAÇÃO

const express = require("express")

const filmesRoutes = require("./routes/filmesRoutes")
const seriesRoutes = require("./routes/seriesRoutes")

const app = express()

app.use(express.json())

//criando a rota raiz para os filmes
app.use("/filmes", filmesRoutes)
app.use("/series", seriesRoutes)

//exportar pra ser usado no server.js
module.exports = app