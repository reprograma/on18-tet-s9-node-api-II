//centralizar o conteudo da aplicação
//rotas raizes
const express = require("express") //importe do express

//importe da continuacao das rotas de filmes
const filmesRoutes = require("./routes/filmesRoutes")
const seriesRoutes = require("./routes/seriesRoutes")

const app = express() //executo o express

app.use(express.json()) //uso o bodyparser

//crio a rota raiz de filmes 
app.use("/filmes", filmesRoutes) 

//crio rota raiz de series
app.use("/series", seriesRoutes)

//exportando para usar o server.js
module.exports = app 