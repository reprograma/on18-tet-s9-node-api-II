//invocando no nosso projeto o banco de dados
const response = require("../app")
const dbConfig = require("../models/dbConfig")

//função getAll retornar todos os filmes
const getAll = async(request, response)=>{
    try {
        let filmesJson = await dbConfig.bancoDeDados("filmes")

        response.status(200).send(filmesJson)

    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

const getById = async(request, response)=>{
    try {
        let filmesJson = await dbConfig.bancoDeDados("filmes")
        let idRequest = request.params.idRequest

        let encontraFilmesPeloId = filmesJson.find(filme=> filme.id == idRequest)

       
        if (encontraFilmesPeloId == undefined) throw new Error ("filme não encontrado")

        response.status(200).send(encontraFilmesPeloId)
    }catch(error){
        response.status(404).json({menssage: error.menssage})
    }
}
//exportar as funções do controller
module.exports = {
    getAll,
    getById
}