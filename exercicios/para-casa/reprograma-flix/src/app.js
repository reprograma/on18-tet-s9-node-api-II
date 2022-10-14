//Centralizar conteúdo da aplicação
//ROTAS RAÍZES

const express = require("express")

const filmesRoutes = require("./routes/filmesRoutes")
const seriesRoutes = require("./routes/seriesRoutes")

const app = express()

app.use(express.json())

//criando rota raiz de filmes
app.use("/filmes", filmesRoutes)
//rota raiz series
app.use("/series", seriesRoutes)

//exportar app para ser usado no server.js
module.exports = app
