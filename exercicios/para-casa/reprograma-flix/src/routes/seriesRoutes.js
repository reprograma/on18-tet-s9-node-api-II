const dbConfig = require ("../models/dbConfig")

async function dbConnect (){
    return await dbConfig.bancoDeDados("series")
}

//pesquisar por serie
const getAll = async (request, response ) =>{
    try{
        let seriesJson = await dbConnect()
    } catch (error){
        response.status(500).json ({mensage:error.mensage})
    }
}

// filtrar por titulo
const getByTitle = async(request, response) =>{
    try {
        let seriesJson = await dbConfig.bancoDeDados("filmes")
        let tituloRequest = request.query.titulo.toLowerCase() 

        let encontraSeriespeloTitulo = seriesJson.find(filme =>filme.id == tituloRequest)
        if(encontraSeriespeloTitulo == undefined) throw new Error 

    } catch (error) {
        response.status(404).json({mensage: error.mensage})
    }
}
//filtrar por id 
const getByID = async(request, response) =>{
    try {
        let seriesJson = await dbConfig.bancoDeDados("filmes")
        let idRequest = request.params.id 

        let encontraSeriepeloID = seriesJson.find(filme =>filme.id == idRequest)
        if(encontraSeriepeloID == undefined) throw new Error 

    } catch (error) {
        response.status(404).json({mensage: error.mensage})
    }
}
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

const cadastrarSerie = async(request, response) =>{
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

// editrar titulo
const editarTitulo =  async(request,response) =>{
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

// substituit as informacoes de uma serie
const seriePorId= async (request,response) =>{
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
const updateporSerie= async (request, response) => {
    try {
        const seriesJson = await dbConnect()

        let idRequest = request.params.id
        let bodyRequest = request.body
        const serieEncontrada = seriesJson.find (serie => serie.id == idRequest)
        if(serieEncontrada == undefined) throw new Error("serie n encontrada")

        bodyRequest.id = serieEncontrada.id
        response(200).json({"mensagem": "Dados da serie atualizados", serieEncontrada})        
    } catch (error){
        response.status(404).json({mensage:error.mensage})
    }
}

module.exports = {
    getAll,
    getByID,
    getByTitle,
    getByGenre,
    cadastrarSerie,
    editarTitulo,
    seriePorId,
    updateporSerie,
}