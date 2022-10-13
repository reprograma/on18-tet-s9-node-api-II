//invocação de bd
const dbConfig = require("../models/dbConfig")

//criar função assinc para o bd - filmes
async function dbConnect(){
    return await dbConfig.bancoDeDados("filmes")
}
//função getAllBoth = todos os filmes E séries
const getAllBoth = async(request,response)=>{
    try {
        let filmesJson = await dbConfig.bancoDeDados("filmes")
        let seriesJson = await dbConfig.bancoDeDados("series")
        response.status(200).send(filmesJson,seriesJson)
    } catch (error) {
        
    }
}

//função getAll = todos os filmes
const getAll = async(request,response)=>{
    try {
        let filmesJson = await dbConfig.bancoDeDados("filmes")

        response.status(200).send(filmesJson)
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

//função getById = filmes por id
const getById = async(request,response)=>{
    try {
        let filmesJson = await dbConfig.bancoDeDados("filmes")
        let idRequest = request.params.id

        let encontraFilmePeloId = filmesJson.find(filme => filme.id == idRequest)
        if(encontraFilmePeloId == undefined) throw new Error("Filme não encontrado")
        response.status(200).send(encontraFilmePeloId)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

//exporta funções
module.exports={
    getAllBoth,
    getAll,
    getById
}