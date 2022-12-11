const dbConfig = require("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("series")
}

const getAll = async(request, response)=>{
    try {
        let seriesJson = await dbConnect()
        response.status(200).send(seriesJson)
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

//get por query params
const getByGenre = async(request, response)=>{
    try {
        const seriesJson = await dbConnect()
        const generoRequest = request.query.genero

        const seriesFiltradas = seriesJson.filter(filme => filme.genre.toString().includes(generoRequest))

        response.status(200).send(seriesFiltradas)

    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

module.exports = {
    getAll,
    getByGenre
}