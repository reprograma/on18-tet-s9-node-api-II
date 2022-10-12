//invocando o nosso projeto o banco de dados
const { request, response } = require("../app")
const dbConfig = require("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("filmes")
}

//função getAll retornando todos os filmes
const getAll = async(request, response) => {
    try {
        let filmeJson = await dbConfig()
        response.status(200).send(filmeJson)
    } catch (error) {
        response.status(500).json({message: error.message})
        
    }
}

const getById = async(request, response) => {
    try {
        let filmeJson = await dbConfig()
        let idRequest = request.params.id

        let encontrarFilmesPeloId = filmeJson.find(filme => filme.id == idRequest)

        if (encontrarFilmesPeloId == undefined) throw new Error("filme não encontrado")

        response.status(200).json(encontrarFilmesPeloId)
    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

module.exports = {
    getAll,
    getById
}