const dbConfig = require("../models/dbConfig")

async function dbConnect() {
    return await dbConfig.bancoDeDados("filmes")
}

const getAll = async(request, response)=>{
    try {
        let filmesJson = await dbConfig.bancoDeDados("filmes")
        
        response.status(200).send(filmesJson)

    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

module.exports ={
    getAll
}