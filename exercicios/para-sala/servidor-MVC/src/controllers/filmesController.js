// invocando no nosso projeto o banco de dados 
const { request, response } = require("express")
const dbConfig = require("../models/dbConfig")

async function dbConnect() {
    return await dbConfig.bancoDeDados("filmes")
}


//função getAll retornar todos os filmes
const getAll = async (request, response) => {
    try {
        let filmesJson = await dbConnect()

        response.status(200).send(filmesJson)

    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

//exportar as funções do controller
module.exports = {
    getAll,
    dbConnect
}