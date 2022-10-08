//CENTRALIZA O CONTEUDO DA APLICAÇÃO
//ROTAS RAIZES

const express = require("express")

const filmesRoutes = require("./routes/filmesRoutes")

const app = express()

app.use(express.json())

//criando rota raiz de filmes
app.use("/filmes", filmesRoutes)

//exportar app para ser usado no server.js
module.exports = app