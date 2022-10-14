//invocando no nosso projeto o banco de dados
const dbConfig = require("../models/dbConfig")

async function dbConnect (){
    return await dbConfig.bancoDeDados("filmes")
}

const getAll = async (resquest, response) =>{
    try {
        let filmesJson = await dbConfig.bancoDeDados("filmes")
        response.status(200).send(filmesJson)
    }
    catch(error) {
        response.status(500).json({mensage: error.mensage})
    }
}

const getByID = async(request, response) =>{
    try {
        let filmesJson = await dbConfig.bancoDeDados("filmes")
        let idRequest = request.params.id 

        let encontraFilmepeloID = filmesJson.find(filme =>filme.id == idRequest)
        if(encontraFilmepeloID == undefined) throw new Error 

    } catch (error) {
        response.status(404).json({mensage: error.mensage})
    }
}
//exportar as funções o controller

module.exports={
    getAll,
    getByID
}