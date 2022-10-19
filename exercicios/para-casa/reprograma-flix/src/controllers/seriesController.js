//invocando no nosso projeto o banco de dados
const dbConfig = require("../models/dbConfig")

async function dbConnect() {
    return await dbConfig.bancoDeDados("series")
}
//Todos as series
const getAll = async(request, response)=>{
    try {
        let dbSeries = await dbConnect()

        response.status(200).send(dbSeries)

    } catch (error) {
        response.status(500).json({message: error.message})
    }
}
//serie por ID
const getId = async(request, response)=>{
    try {
        let dbSeries = await dbConnect()
        let idRequest = request.params.id

        let localizaSeriePorId = dbSeries.find(serie => serie.id == idRequest)

        if(localizaSeriePorId == undefined) throw new Error("serie não encontrada")

        response.status(200).send(localizaSeriePorId)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}
//Atualização
const getAtualizacao = async (request, response)=>{
    try {
        const dbSeries = await dbConnect()

        let idRequest = request.params.id
        let bodyRequest = request.body

    const serieEncontrada = dbSeries.find(serie => serie.id == idRequest)

    if(serieEncontrada == undefined) throw new Error("serie não encontrado")

    bodyRequest.id = serieEncontrada.id

    let keys = Object.keys(serieEncontrada)

    keys.forEach((key)=>{
        if(bodyRequest[key] == undefined){
            serieEncontrada[key] = serieEncontrada[key]
            
        }else{
            serieEncontrada[key] = bodyRequest[key]
        }
    })

    response.status(200).json({"mensagem": "serie atualizada", serieEncontrada})
        
    } catch (error) {
        response.status(404).json({message: error.message})
    }
}
//get por query params
const getGenero = async(request, response)=>{
    try {
        const dbSeries = await dbConnect()
        const generoRequest = request.query.genero

        const seriesFiltradas = dbSeries.filter(serie => serie.genre.toString().includes(generoRequest))

        response.status(200).send(seriesFiltradas)

    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

// Exportar as funções do controller
module.exports = {
    getAll,
    getId,
    getAtualizacao,
    getGenero
}