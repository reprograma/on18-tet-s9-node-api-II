//invocando o banco de dados 
const dbConfig = require("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("series")
}
//mostrar todas as series
const getAll = async(request, response)=>{
    try {
        let seriesJson = await dbConnect()//guardando as series aqui
        response.status(200).send(seriesJson)
    } catch (error) {
        response.status(500).json({message: error.message})//tratar erro de digitação
    }
}
//Busca series por genero - get por query params
const getByGenre = async(request, response)=>{
    try {
        const seriesJson = await dbConnect()
        const generoRequest = request.query.genero//

        const seriesFiltradas = seriesJson.filter(filme => filme.genre.toString().includes(generoRequest))

        response.status(200).send(seriesFiltradas)

    } catch (error) {
        response.status(500).json({message: error.message})
    }
}
//busca séries por id
//função getByTd retornar os filmes por id
const getSeriesById = async(request, response)=>{
    try {
        let seriesJson = await dbConnect()
        let idRequest = request.params.id

        let encontraSeriePeloId = seriesJson.find(filme => filme.id == idRequest)

        if(encontraSeriePeloId == undefined) throw new Error("série não encontrada")

        response.status(200).send(encontraSeriePeloId)

    } catch (error) {
        response.status(404).json({message: error.message})
        
    }
}




module.exports = {
    getAll,
    getByGenre,
    getSeriesById
}