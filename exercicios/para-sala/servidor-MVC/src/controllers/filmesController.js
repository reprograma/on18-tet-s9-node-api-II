//invocando no nosso projeto o banco de dados
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

//exportar as funções do controller
module.exports ={
    getAll
}

