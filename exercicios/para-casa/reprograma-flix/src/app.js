// centraliza o conteudo da aplicação e todas rotas raizes

const express = require("express")
const app = express()

const filmesRoutes = require("./routes/filmesRoutes")
app.use(express.json())
app.use("/filmes", filmesRoutes)


const seriesRoutes = require("./routes/seriesRoutes")
app.use(express.json())
app.use("/series", seriesRoutes)



module.exports = app