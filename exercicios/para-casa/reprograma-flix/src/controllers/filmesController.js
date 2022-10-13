const { request, response } = require("express")
const dbConfig = require("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("filmes")
}

// [GET]   Catalogo de filmes
const getAll = async (request, response) => {
    try {
        let filmesJson =  await dbConnect()
        response.status(200).send(filmesJson)
        
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

// [GET]   Filtrar por titulo
const getByTitle = async (request, response) => {
    try {
    let filmesJson = await dbConnect()
    let tituloRequest = request.query.titulo.toLowerCase()

    let encontrarFilmePorTitulo = filmesJson.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))

    if(encontrarFilmePorTitulo == 0) throw new Erros("Filme nao encontrado")

    response.status(200).send(encontrarFilmePorTitulo)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

// [GET]   Filtrar por id
const getById = async (request, response) => {
    try {
    let filmesJson = await dbConnect()
    let idRequest = request.params.id

    let encontrarFilmePeloId = filmesJson.find(filme => filme.id == idRequest)

    if(encontrarFilmePeloId == undefined) throw new Erros("Filme nao encontrado")

    response.status(200).send(encontrarFilmePeloId)

    } catch (error) {
        response.status(404).json({message: error.message})
    }

}

// [GET]   Filtrar por genero
const getByGenre = async(request,response) => {
    try {
        const filmesJson = await dbConnect()
        const generoRequest = request.query.genero

        const filmesFiltrados = filmesJson.filter(filme => filme.genre.includes(generoRequest))

        response.status(200).send(filmesFiltrados)
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

// [POST]  Cadastrar novo filme
const cadastrarNovoFilme = async(request, response) =>{
    try {
        let filmesJson = await dbConnect()
        let bodyRequest = request.body
    
        let novoFilme = bodyRequest
        novoFilme.id = (filmesJson.lenght)+1

        filmes.push(novoFilme)

        response.status(201).send({
         mensagem: "filme cadastrado com sucesso", 
         novoFilme
        })
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

// [PATCH] Editar titulo
const editarTitulo = async(request,response) =>{
    try {
        let filmesJson = await dbConnect()

        let idRequest = request.params.id
        let novoTitulo = request.body.Title

        let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

        filmeEncontrado.Title = novoTitulo

        response.status(200).json({
         "mensagem": "titulo atualizado com sucesso",
         "filme-atualizado": filmeEncontrado
     })
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

// [PUT]   Substituir todas as informacoes de um filme
const substituirFilmePorId = async (request,response) =>{
    try {
        let filmesJson = await dbConnect()
        let idRequest = request.params.id
        let bodyRequest = request.body

        let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
        filmeEncontrado.id = filmeEncontrado.id
        filmeEncontrado.body = bodyRequest

        response.status(200).json({
         "mensagem": "filme atualizado com sucesso",
            "filme atualizado": filmeEncontrado
        })        
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

// [PUT] Editar qualquer campo de um filme
const updateGenerico = async (request, response) => {
    try {
        const filmesJson = await dbConnect()

        let idRequest = request.params.id
        let bodyRequest = request.body
    
        const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    
        if(filmeEncontrado == undefined) throw new Error("filme nao encontrado")
    
        bodyRequest.id = filmeEncontrado.id

        let chaves = Object.keys(filmeEncontrado)

        chaves.forEach((chave)=>{
            if(bodyRequest[chave] == undefined){
                filmeEncontrado[chave] = filmeEncontrado[chave]
            } else {
                filmeEncontrado[chave] = bodyRequest[chave]
            }
        })

        response(200).json({"mensagem": "Dados do filme atualizados", filmeEncontrado})
        
    } catch (error) {
        response.status(404).json({message: error.message})
    }
}


module.exports = {
    getAll,
    getByTitle,
    getById,
    getByGenre,
    cadastrarNovoFilme,
    editarTitulo,
    substituirFilmePorId,
    updateGenerico,
}