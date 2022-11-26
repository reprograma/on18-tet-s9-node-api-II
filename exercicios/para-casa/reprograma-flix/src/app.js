const express = require('express')

const filmesRoutes = require("./routes/filmesRoutes")
const seriesRoutes = require("./routes/seriesRoutes")

const app = express()


app.use("./filmes", filmesRoutes)
app.use("./series", seriesRoutes)
app.use(express.json())




module.exports = app