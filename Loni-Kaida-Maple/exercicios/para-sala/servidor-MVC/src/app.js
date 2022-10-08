//Centraliza o conteudo da aplicação
//Rotas raizes

const express = require("express");
const filmesRoutes = require("./routes/filmRoutes");
const app = express();

app.use(express.json());

//Criando rota raiz de filmes
app.use("/filmes", filmesRoutes)