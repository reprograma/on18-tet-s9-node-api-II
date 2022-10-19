//CENTRALIZA O CONTEUDO DA APLICAÇÃO
//ROTAS RAIZES

const express = require("express") 

const filmesRoutes = require("./routes/filmesRoutes")
// const seriesRoutes = require("./routes/seriesRoutes")

//executando express
const app = express() 

//boryparser
app.use(express.json())

//rota raiz de filmes
app.use("/filmes", filmesRoutes)

//rota raiz de series (como não configurei as rotas de series, está
// comentada para não interferir no codigo)
// app.use("/series", seriesRoutes)

//exportar app para ser usado no server.js
module.exports = app