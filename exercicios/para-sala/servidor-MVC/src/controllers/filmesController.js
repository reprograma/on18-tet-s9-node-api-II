// Chamar meu arquivo dbConfig //invocando no nosso projetoo banco de dados
const dbConfig = require("../models/dbConfig")

//criar uma função getAll que vai retornar todos os filmes
//getAll em portugues = retornar tudo
//dbConfig é o arquivo(banco de dados)
//Mas eu nao quero o arquivo, quero a função que tem dentro dele (.bancoDeDados) e ("filmes") é o que o usuario vai passar

async function dbConect() {
    return await dbConfig.bancoDeDados("filmes")
}

const getAll = async (request, response) => {
    try {
        let filmesJson = await dbConect()
        // let filmesJson = await dbConfig.bancoDeDados("filmes")

        response.status(200).send(filmesJson)

    } catch (error) {
        Response.status(500).json({message: error.message})

    }
}



//exportar as funções do controller para que eu possar acessar e usar em outros arquivos

module.exports ={
    getAll
}