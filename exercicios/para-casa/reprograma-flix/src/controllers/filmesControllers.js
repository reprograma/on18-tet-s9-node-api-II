const dbConfig = require("../models/dbConfig")
async function dbconnect(){
    return await dbConfig.bancoDeDados("filmes")
}

//função getAll retorna todos os filmes
const getAll = async(request, response)=>{
    try {
        //bd é o arquivo e .bdd é o que queremos acessar e como tem parametro
        //é preciso sinalizer o que pegar
        let filmesJson = await dbconnect()
        response.status(200).send(filmesJson)

    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

const getFilterTitle = async(request, response) => {
    try {
        let filmesJson = await dbconnect()
        let tituloRequest = request.query.titulo.toLowerCase()
        let encontrarPorTitulo = filmesJson.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))

        if(encontrarPorTitulo.length == 0) throw new Error("filme não encontrado")
        response.status(200).send(encontrarPorTitulo)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

const getById = async(request, response) => {
    try {
        let filmesJson = await dbconnect()
        let idRequest = request.params.id
        let encontrarPorId = filmesJson.find(filme => filme.id == idRequest)
        if (encontrarPorId  ==  undefined ) throw new Error( "id não encontrado" )
        response.status(200).send(encontrarPorId)
    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

const getByGenre = async(request, response) => {
    try {
        let filmesJson = await dbconnect()
        let generoRequest = request.query.genero

        let encontrarPorGenero= filmesJson.filter(filme => filme.Genre.includes(generoRequest))

        if(encontrarPorGenero.length == 0) throw new Error("filme não encontrado")
        response.status(200).send(encontrarPorGenero)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

const postFilmes = async(request, response) => {
    let filmesJson = await dbconnect()
    let bodyRequest = request.body

    let novoFilme = {
        id:(filmesJson.length)+1,
        Title: bodyRequest.Title,
        Year: bodyRequest.Year,
		Rated: bodyRequest.Rated,
		Released: bodyRequest.Released,
		Runtime: bodyRequest.Runtime,
		Genre: bodyRequest.Genre,
		Director: bodyRequest.Director,
		Writer: bodyRequest.Writer,
		Actors: bodyRequest.Actors,
		Plot: bodyRequest.Plot,
		Language: bodyRequest.Language,
		Country: bodyRequest.Country,
		Awards: bodyRequest.Awards
    }

    filmesJson.push(novoFilme)

    response.status(200).send({
        mensagem:"filme cadastrado com sucesso",
        novoFilme
    })
}

const substituirFilme = async (request, response) => {
    const filmesJson = await dbconnect()
    let idRequest = request.params.id
    let bodyRequest = request.body

    let filmeASerSubstituido = filmesJson.find(filme => filme.id == idRequest)

    const indice = filmesJson.indexOf(filmeASerSubstituido)

    //ARRAY.splice(indice, quatidade a ser deletado, item que vai entrar no lugar)
    filmesJson.splice(indice, 1, bodyRequest)
    response.status(200).json({
        "mensagem":"Filme atualizado com sucesso",
        "filme-atualizado": bodyRequest
    })
}

const updateTitulo = async (request, response) => {
    const filmesJson = await dbconnect()

    let novoTitulo = request.body.Title
    let idRequest = request.params.id

    let filmeEditado = filmesJson.find(filme => filme.id == idRequest)

    filmeEditado.Title = novoTitulo

    response.status(200).json({
        "mensagem": "titulo atualizado com sucesso",
        "filme-atualizado": filmeEditado
    })
}

//exportar funções do controller
module.exports = {
    getAll,
    getFilterTitle,
    getById,
    getByGenre,
    postFilmes,
    substituirFilme,
    updateTitulo
}