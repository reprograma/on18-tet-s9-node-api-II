const dbConfig = require ("../models/dbConfig")

async function dbConnect (){
    return await dbConfig.bancoDeDados("series")
}

const getAll = async (request, response ) =>{
    try{
        let seriesJson = await dbConnect()
    } catch (error){
        response.status(500).json ({mensage:error.mensage})
    }
}

module.exports = {
    getAll
}