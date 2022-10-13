const dbConfig = require("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("series")
}
const getAll = async(request,response) =>{
    try {
        let seriesJson = await dbConnect()
        response.status(200).send(seriesJson)
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}
const getById = async(request,response) => {
    try{
        let seriesJson = await dbConnect()

        let idRequest = request.params.id
        let encontrarSeriesPorId = seriesJson.find(serie => serie.id == idRequest)
        if(encontrarSeriesPorId == undefined) throw new Error("Serie não encontrado")
        response.status(200).send(encontrarSeriesPorId)
    }catch(error){
    response.status(404).json({message: error.message})
    }
}
const getTitle =  async (request, response)=>{

    try {

        let seriesJson = await dbConnect()
        let tituloRequest = request.query.titulo.toLowerCase()
        let seriesEncontradoPorTitulo = seriesJson.filter(serie => serie.Title.toLowerCase().includes(tituloRequest))
        console.log(seriesEncontradoPorTitulo)

        if (seriesEncontradoPorTitulo.length == 0 ) throw new Error("filme não encontrado")

        response.status(200).send(seriesEncontradoPorTitulo)

    } catch (error) {
        response.status(404).json({message: error.message})
    }

}
const getByGenero = async (request, response)=>{
    try {
        let seriesJson = await dbConnect()
        let generoRequest = request.query.genero

        let encontraSeriePeloGenero = seriesJson.filter(serie => serie.genre.toString().includes(generoRequest))

        console.log(encontraSeriePeloGenero)

        if(encontraSeriePeloGenero == undefined) throw new Error("Serie não encontrada.")

        response.status(200).send(encontraSeriePeloGenero)

    } catch (error){
        response.status(404).json({message: error.message})
    }
}

module.exports = {
    getAll,
    getById,
    getTitle,
    getByGenero
}