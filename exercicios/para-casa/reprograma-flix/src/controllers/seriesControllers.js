//invocar bd
const dbConfig = require("../models/dbConfig")

//função para bd - series
async function dbConnect(){
    return await dbConfig.bancoDeDados("series")
}
//função getAll: series
const getAll = async(request,response)=>{
    try {
        let seriesJson = await dbConnect()
        response.status(200).send(seriesJson)
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}
//função getById: series
const getById = async(request,response)=>{
    try {
        let seriesJson = await dbConnect()
        let idRequest = request.params.id
        let encontraSeriePeloId = seriesJson.find(serie => serie.id == idRequest)
        if (encontraSeriePeloId == undefined) throw new Error("Série não encontrada")
        response.status(200).send(encontraSeriePeloId)
    } catch (error) {
        response.status(404).json({message: error.message})
    }
}
//exporta funções
module.exports={
    getAll,
    getById
}