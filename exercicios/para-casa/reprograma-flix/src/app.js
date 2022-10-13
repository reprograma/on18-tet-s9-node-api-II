const express = require("express")

const filmesroutes = require("./routes/filmesRoutes")
const seriesroutes = require("./routes/seriesRoutes")


const app = express()

app.use(express.json())

app.use("/filmes", filmesroutes)

app.use("/series", seriesroutes)








module.exports = app