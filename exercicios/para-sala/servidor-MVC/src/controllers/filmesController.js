//invocando no nosso projeto o banco de dados
const dbConfig = require("../models/dbConfig")

async function dbConnect() {
    return await dbConfig.bancoDeDados("filmes")
}

//função getAll retornar todos os filmes
const getAll = async(request, response)=>{
    try{
        let filmesJson = await dbConnect()
        //let filmesJson = await dbConfig.bancoDeDados("filmes")
        
        response.status(200).send(filmesJson)

    } catch (error){
        response.status(500).json({message: error.message})
    }
}

const getById = async(request, response)=>{
    try{
        let filmesJson = await dbConnect()
        let idRequest = request.params.id

        let encontrarFilmePeloId = filmesJson.find(filme => filme.id == idRequest)

        if(encontrarFilmePeloId == undefined) throw new Error("filme nao encontrado")

        response.status(200).send(encontrarFilmePeloId)
    } catch (error){
        response.status(500).json({message: error.message})
    }
}

//exportar as funções do controller
module.exports = {
    getAll, 
    getById
}
