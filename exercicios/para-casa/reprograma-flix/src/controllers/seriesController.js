const dbConfig = require("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("series")
}

const getAll = async(request, response) =>{
    try {
        let seriesJson = await dbConnect()
        response.status(200).send(seriesJson)
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

const getById = async(request, response) =>{
    try {
        let seriesJson = await dbConnect()
        let idRequest = request.params.id

        let getSerieById  = seriesJson.find(serie => serie.id == idRequest)

        if(getSerieById == undefined) throw new Error("série não encontrada")


        response.status(200).send(getSerieById)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

const getByTitle = async(request, response)=> {
    try {
        let seriesJson = await dbConnect()
        let tituloRequest = request.query.titulo.toLowerCase()

        let getSerieByTitle = seriesJson.filter(serie => serie.title.toLowerCase().includes(tituloRequest))

        if(getSerieByTitle.length == 0) throw new Error("série não encontrada")

        response.status(200).send(getSerieByTitle)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

const getByGenre = async(request, response)=>{
    try {
        let seriesJson = await dbConnect()
        let generoRequest = request.query.genero

        let seriesFiltradas = seriesJson.filter(serie => serie.genre.toString().includes(generoRequest))

        if(seriesFiltradas.length == 0) throw new Error("série não encontrada")

        response.status(200).send(seriesFiltradas)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

const cadastrarNovaSerie = async (request, response)=> {
    let seriesJson = await dbConnect()
    let bodyRequest = request.body

    let novaSerie = {
        id:(seriesJson.length)+1,
        title: bodyRequest.title,
        totalSeasons: bodyRequest.totalSeasons,
        genre: bodyRequest.genre,
        writers: bodyRequest.writers,
        poster: bodyRequest.poster,
        actors: bodyRequest.actors,
        ratings: {
            rating: bodyRequest.ratings.rating,
            likes: bodyRequest.ratings.likes
        } 
    }

    seriesJson.push(novaSerie)

    response.status(201).send({
        message:"Série cadastrada com sucesso!",
        novaSerie
    })
}

const updateTitulo = async(request, response)=>{
    try{
        let seriesJson = await dbConnect()
        let idRequest = request.params.id
        let novoTitulo = request.body.title
        
        let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)
        
        if(serieEncontrada == undefined) throw new Error("série não encontrada")
        
        serieEncontrada.title = novoTitulo
        
        response.status(200).json({
            "mensagem": "título atualizado com sucesso",
            "série-atualizada": serieEncontrada
    })
    } catch(error){
        response.status(404).json({message: error.message})
    }
}

module.exports = {
    getAll,
    getById,
    getByTitle, 
    getByGenre,
    cadastrarNovaSerie,
    updateTitulo
}
