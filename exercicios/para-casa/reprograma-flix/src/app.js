//centraliza o conteúdo da aplicação
//rotas raízes ficam aqui
//chama o express
const express=require("express")
//importa rotas
const todosRoutes = require("./routes/todosRoutes.js")
const filmesRoutes = require("./routes/filmesRoutes")
const seriesRoutes = require("./routes/seriesRoutes")
const app = express()
app.use(express.json())
//rota raiz todos
app.use("all", todosRoutes)
//rota raiz de filmes
app.use("/filmes",filmesRoutes)

//rota raíz de séries
app.use("/series",seriesRoutes)

//exportar para usar no server.js
module.exports = app