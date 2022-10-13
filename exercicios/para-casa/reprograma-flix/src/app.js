const express = require("express")
const router = require("./routes/seriesRoutes")
const app = express()

const filmesRoutes = require("./routes/filmesRoutes")
app.use(express.json())
app.use("/filmes", filmesRoutes)


const seriesRoutes = require("./routes/seriesRoutes")
app.use(express.json())
app.use("/series", seriesRoutes)



module.exports = app

