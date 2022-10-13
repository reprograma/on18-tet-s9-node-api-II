const { use, router } = require("../app")
const dbConfig = require("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("series")
}

const getAll = async(request,response)=>{
    try {
        let seriesJson = await dbConnect()
        response.status(200).send(seriesJson)
    } catch (error) {
        response.status(500).json({message:error.message})
    }
}

const getById = async(request,response) => {
    try{
        let seriesJson = await dbConnect()
        let idRequest = request.params.id
        let encontrarSeriesPeloId = seriesJson.find(series => series.id == idRequest)
        if(encontrarSeriesPeloId == undefined) throw new Error("Serie não encontrado")
        response.status(200).send(encontrarSeriePeloId)
    }catch(error){
    response.status(404).json({message: error.message})
    }
}
const getTitle =  async (request, response)=>{

    try {

        let seriesJson = await dbConnect()
        let tituloRequest = request.query.titulo.toLowerCase()
        let seriesEncontradoPorTitulo = seriesJson.filter(series => series.title.toLowerCase().includes(tituloRequest))
        console.log(seriesEncontradoPorTitulo)

        if (seriesEncontradoPorTitulo.length == 0 ) throw new Error("Series não encontrado")

        response.status(200).send(seriesEncontradoPorTitulo)

    } catch (error) {
        response.status(404).json({message: error.message})
    }

};
const getByGenre = async(request, response)=>{
    try {
        const seriesJson = await dbConnect()
        const generoRequest = request.query.genero

        const seriesPorGenero = seriesJson.filter(series => series.genre.toString().includes(generoRequest))

        response.status(200).send(seriesPorGenero)

    } catch (error) {
        response.status(500).json({message: error.message})
    }
}


module.exports = {
    getAll,
    getById,
    getTitle,
    getByGenre
}