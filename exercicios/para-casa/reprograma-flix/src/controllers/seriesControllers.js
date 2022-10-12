const dbConfig = require("../models/dbConfig")
async function dbconnect(){
    return await dbConfig.bancoDeDados("series")
}

const getAll = async(request, response)=>{
    try {
        //bd é o arquivo e .bdd é o que queremos acessar e como tem parametro
        //é preciso sinalizer o que pegar
        let seriesJson = await dbconnect()
        response.status(200).send(seriesJson)
    
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

const getFilterTitle = async(request, response) => {
    try {
        let seriesJson = await dbconnect()
        let tituloRequest = request.query.titulo.toLowerCase()
        let encontrarPorTitulo = seriesJson.filter(serie => serie.title.toLowerCase().includes(tituloRequest))

        if(encontrarPorTitulo.length == 0) throw new Error("filme não encontrado")
        response.status(200).send(encontrarPorTitulo)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

const getById = async(request, response) => {
    try {
        let seriesJson = await dbconnect()
        let idRequest = request.params.id
        let encontrarPorId = seriesJson.find(serie => serie.id == idRequest)
        if (encontrarPorId  ==  undefined ) throw new Error( "id não encontrado" )
        response.status(200).send(encontrarPorId)
    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

const getByGenre = async(request, response) => {
    try {
        let seriesJson = await dbconnect()
        let generoRequest = request.query.genero

        let seriesPorGenero = seriesJson.filter(serie => serie.genre.toString().includes(generoRequest))

        if(seriesPorGenero.length == 0) throw new Error("serie não encontrada")
        response.status(200).send(seriesPorGenero)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

const postSerie = async(request, response) => {
    let seriesJson = await dbconnect()
    let bodyRequest = request.body
      
    let novaSerie = {
		"id":(seriesJson.length)+1,
		"title": bodyRequest.title,
		"totalSeasons": bodyRequest.totalSeasons,
		"genre":bodyRequest.genre,
		"writers":bodyRequest.writer,
		"poster": bodyRequest.poster,
		"actors":bodyRequest.actors,
		"ratings":bodyRequest.ratings
    }

    seriesJson.push(novaSerie)
    
    response.status(200).send({
        mensagem:"serie cadastrada com sucesso",
        novaSerie
    })
}

const substituirSerie = async (request, response) => {
    const seriesJson = await dbconnect()
    let idRequest = request.params.id
    let bodyRequest = request.body

    let serieASerSubstituido = seriesJson.find(serie => serie.id == idRequest)

    const indice = seriesJson.indexOf(serieASerSubstituido)
    
    //ARRAY.splice(indice, quatidade a ser deletado, item que vai entrar no lugar)
    seriesJson.splice(indice, 1, bodyRequest)
    response.status(200).json({
        "mensagem":"Serie atualizads com sucesso",
        "serie-atualizada": bodyRequest
    })
}

const updateTitulo = async (request, response) => {
    const seriesJson = await dbconnect()
   
    let novoTitulo = request.body.title
    let idRequest = request.params.id

    let serieEditada = seriesJson.find(serie => serie.id == idRequest)
   
    serieEditada.title = novoTitulo

    response.status(200).json({
        "mensagem": "titulo atualizado com sucesso",
        "serie-atualizada": serieEditada
    })
}


module.exports = {
    getAll,
    getFilterTitle,
    getById,
    getByGenre,
    postSerie,
    substituirSerie,
    updateTitulo
}