const express = require("express");
const app = express();

const filmesRoutes = require("./routes/filmesRoutes");
const seriesRoutes = require("./routes/seriesRoutes");

app.use(express.json());

app.use("/filmes", filmesRoutes);
app.use("/series", seriesRoutes);

module.exports = app;
