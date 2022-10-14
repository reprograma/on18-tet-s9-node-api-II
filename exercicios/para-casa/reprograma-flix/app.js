const express = require("express")

const rotaFilmes = require("./routes/rotaFilmes")
const rotaSeries = require("./routes/rotaSeries")
const app = express()

app.use(express.json())

app.use("/filmes", rotaFilmes)
app.use("/series", rotaSeries)

module.exports = app
