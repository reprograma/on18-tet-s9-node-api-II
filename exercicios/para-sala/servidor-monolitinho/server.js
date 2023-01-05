function bancoDeDados() {
    return new Promise((resolve)=>{
        setTimeout(() => {
            return resolve({
                series: require("./data/series.json"),
                filmes: require("./data/filmes.json")
            })
                
        }, 1500);
    })
}

const { response, request } = require("express");
//começa o nosso servidor

const express = require("express")
const app = express()

//parser do body em json
app.use(express.json())


app.get("/filmes", async (request, response)=>{
    let dbFilmes = await bancoDeDados()

    response.status(200).send(dbFilmes.filmes)
})

app.get("/filmes/pesquisar/:id", async (request, response)=>{

    try {
        let idRequest = request.params.id
        let dbFilmes = await bancoDeDados()
    
        let filmeEncontrado = dbFilmes.filmes.find( filme => filme.id == idRequest)

        if(filmeEncontrado == undefined) throw new Error("id não encontrado")

        response.status(200).send(filmeEncontrado)
        
    } catch (error) {
        response.status(404).json({message: error.message})
    }
})

app.get("/filmes/pesquisar", async (request, response)=>{
    try {
        let dbFilmes = await bancoDeDados()
        let tituloRequest = request.query.titulo.toLowerCase()

        let encontrarPorTitulo = dbFilmes.filmes.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))

        console.log(encontrarPorTitulo)

        if(encontrarPorTitulo.length == 0) throw new Error("filme não encontrado")
        

        response.status(200).send(encontrarPorTitulo)
    } catch (error) {
        response.status(404).json({message: error.message})
    }
})

app.get("/filmes/buscar", async (request, response)=>{
    try {
        let dbFilmes = await bancoDeDados()
        let filmesJson = dbFilmes.filmes
        let parametros = request.query

        console.log(parametros)

        const chaves = Object.keys(parametros);

        const filtrado = filmesJson.filter((filme) => {
              return chaves.some(key => RegExp(parametros[key], 'i').test(filme[key].toString()));
            });
    
        console.log(filtrado);

          if(filtrado.length == 0) throw new Error("filme não encontrado")

        
        response.status(200).send(filtrado)
        
    } catch (error) {
        response.status(404).json({message: error.message})
    }
})

app.post("/filmes/cadastrar", async (request, response)=>{
    let bodyRequest = request.body
    let dbFilmes = await bancoDeDados()
    let filmes = dbFilmes.filmes

    console.log(filmes.length)

    let novoFilme = {
        id:(filmes.length)+1,
        title: bodyRequest.title,
        description: bodyRequest.description
    }

    filmes.push(novoFilme)

    response.status(201).send({
        mensagem: "filme cadastrado com sucesso",
        novoFilme
    })

})

app.get("/series", async (request, response)=>{
    let dbseries = await bancoDeDados()

    response.status(200).send(dbseries.series)
})

app.delete("/filmes/delete/:id", async (request,response) => {
    const dbFilmes = await bancoDeDados()
    let filmesJson = dbFilmes.filmes
    let idRequest = request.params.id

    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    const indice = filmesJson.indexOf(filmeEncontrado)

    filmesJson.splice(indice, 1)

    response.status(200).json({
        "mensagem": "O filme foi deletado com sucesso",
        "filme-deletado": filmeEncontrado
    })
})

app.put("filmes/substituir/:id", async (request, response) => {
    const dbFilmes = await bancoDeDados()
    let filmesJson = dbFilmes.filmes

    let idRequest = request.params.id

    const filmesEncontrado = filmesJson.find(filme => filme.id == idRequest)
    let indice = filmesJson.indexOf(filmesEncontrado)

    filmesJson.splice(indice, 1, bodyRequest)
    response.status(200).json({
        "mensagem": "filme atualizado com sucesso",
        "filme-atualizado": bodyRequest
    })
})

app.patch("/filmes/updatetitulo/:id", async (request, response) => {
    let dbFilmes = await bancoDeDados()
    let let filmesJson = dbFilmes.filmes

    let idRequest = request.params.id
    let novoTitulo = request.body.Title
})

app.listen(1313, ()=>{
    console.log("servidor rodando")
})