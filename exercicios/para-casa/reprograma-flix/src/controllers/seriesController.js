const { response } = require("../app")
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

const getById = async(request, response)=>{
    try {
       let seriesJson = await dbConnect()
       let idRequest = request.params.id
       
       let encontrarSeriePeloId = seriesJson.find(series => series.id == idRequest)

       if(encontrarSeriePeloId == undefined) throw new Error ("Serie não encontrado")

       response.status(200).send(encontrarSeriePeloId)

    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

const updateDados = async(request, response)=>{
    try {
        const seriesJson = await dbConnect()

        let idRequest = request.params.id
        let bodyRequest = request.body

    const serieEncontrada = seriesJson.find(series => series.id == idRequest)
    
    if(serieEncontrada == undefined) throw new Error ("Serie não encontrada")

    bodyRequest.id = serieEncontrada.id

    let chaves = Object.keys(serieEncontrada)

    chaves.forEach((chave)=>{
        if(bodyRequest[chave] == undefined){
            serieEncontrada[chave] == serieEncontrada[chave]
        }else{
            serieEncontrada[chave] = bodyRequest[chave]
        }
    })
        
    response.status(200).json({"mensagem": "Serie atualizada", serieEncontrada})

    } catch (error) {
    response.status(404).json({message: error.message})    
    }
}


const getByGenre = async(request, response)=>{
    try {
      const seriesJson = await dbConnect()
      const generoRequest = request.query.genero

      const seriesFiltradas = seriesJson.filter(serie => serie.genre.toString().includes(generoRequest))

      response.status(200).send(seriesFiltradas)  
    } catch (error) {
        response.status(500).json({message: error.message})  
    }
}

module.exports = {
    getAll,
    getById,
    updateDados,
    getByGenre
}