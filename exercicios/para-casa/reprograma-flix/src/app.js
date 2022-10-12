// Centraliza o conteúdo da aplicação 

// Rotas raízes

const express = require("express")

// Importar as rotas para filmes
const filmesRoutes = require("./routes/filmesRoutes")

// Importar as rotas para series
const seriesRoutes = require("./routes/seriesRoutes")

const app = express()

app.use(express.json())

// Criando rota raiz de filmes
app.use("/filmes", filmesRoutes)

// Criando rota raiz de series
app.use("/series", seriesRoutes)

// Exportar app para ser usado no server.js
module.exports = app