const { request, response } = require("express")
const dbConfig = require("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("series")
}

// [GET]   Catalogo de series
const getAll = async(request, response)=>{
    try {
        let seriesJson = await dbConnect()
        response.status(200).send(seriesJson)
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

// [GET]   Filtrar por titulo
const getByTitle = async (request, response) => {
    try {
    let seriesJson = await dbConnect()
    let tituloRequest = request.query.titulo.toLowerCase()

    let encontrarSeriePorTitulo = seriesJson.filter(serie => serie.Title.toLowerCase().includes(tituloRequest))

    if(encontrarSeriePorTitulo == 0) throw new Erros("Serie nao encontrado")

    response.status(200).send(encontrarSeriePorTitulo)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

// [GET]   Filtrar por id
const getById = async (request, response) => {
    try {
    let seriesJson = await dbConnect()
    let idRequest = request.params.id

    let encontrarSeriePeloId = seriesJson.find(serie => serie.id == idRequest)

    if(encontrarSeriePeloId == undefined) throw new Erros("Serie nao encontrada")

    response.status(200).send(encontrarSeriePeloId)

    } catch (error) {
        response.status(404).json({message: error.message})
    }

}

// [GET]   Filtrar por genero
const getByGenre = async(request,response) => {
    try {
        const seriesJson = await dbConnect()
        const generoRequest = request.query.genero

        const seriesFiltradas = seriesJson.filter(serie => serie.genre.toString().includes(generoRequest))

        response.status(200).send(seriesFiltradas)
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

// [POST]  Cadastrar nova serie
const cadastrarNovaSerie = async(request, response) =>{
    try {
        let seriesJson = await dbConnect()
        let bodyRequest = request.body
    
        let novaSerie = bodyRequest
        novaSerie.id = (seriesJson.lenght)+1

        filmes.push(novaSerie)

        response.status(201).send({
         mensagem: "serie cadastrada com sucesso", 
         novoFilme
        })
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

// [PATCH] Editar titulo
const editarTitulo = async(request,response) =>{
    try {
        let seriesJson = await dbConnect()

        let idRequest = request.params.id
        let novoTitulo = request.body.Title

        let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

        serieEncontrada.Title = novoTitulo

        response.status(200).json({
         "mensagem": "titulo atualizado com sucesso",
         "serie-atualizado": serieEncontrada
     })
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

// [PUT]   Substituir todas as informacoes de uma serie
const substituirSeriePorId = async (request,response) =>{
    try {
        let seriesJson = await dbConnect()
        let idRequest = request.params.id
        let bodyRequest = request.body

        let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)
        serieEncontrada.id = serieEncontrada.id
        serieEncontrada.body = bodyRequest

        response.status(200).json({
         "mensagem": "serie atualizado com sucesso",
            "serie atualizado": serieEncontrada
        })        
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

// [PUT] Editar qualquer campo de uma serie
const updateGenerico = async (request, response) => {
    try {
        const seriesJson = await dbConnect()

        let idRequest = request.params.id
        let bodyRequest = request.body
    
        const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)
    
        if(serieEncontrada == undefined) throw new Error("serie nao encontrada")
    
        bodyRequest.id = serieEncontrada.id

        let chaves = Object.keys(serieEncontrada)

        chaves.forEach((chave)=>{
            if(bodyRequest[chave] == undefined){
                serieEncontrada[chave] = serieEncontrada[chave]
            } else {
                serieEncontrada[chave] = bodyRequest[chave]
            }
        })

        response(200).json({"mensagem": "Dados da serie atualizados", serieEncontrada})
        
    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

module.exports = {
    getAll,
    getByTitle,
    getById,
    getByGenre,
    cadastrarNovaSerie,
    editarTitulo,
    substituirSeriePorId,
    updateGenerico,
}