const dbConfig = require("../models/dbConfig")

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
        response.status(500).json({message: error.message})
    }
}
module.exports={
    getAllBoth
}