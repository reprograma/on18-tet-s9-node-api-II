// CENTRALIZA E ARMAZENA TODO CONTEUDO DA APLICAÇÃO E AS ROTAS RAÍZES

const express = require("express")

const  filmesRoutes = require("./routes/filmesRoutes")
const  seriesRoutes = require("./routes/seriesRoutes")


const app = express()
 
app.use(express.json())

// CRIANDO ROTA RAIZ DE FILMES E SERIES 
app.use("/filmes", filmesRoutes)

app.use("/series", seriesRoutes)

// EXPORTAR O APP PARA USÁ-LO NO SERVER.js
module.exports = app
