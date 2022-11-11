const dbConfig = require("../models/dbConfig")

async function dbConect() {
    return await dbConfig.bancoDeDados("filmes")     
} 

//função getAll retorna todos os filmes
const getAll = async (request, response) => {
    try {
        let movies = await dbConect()
        //const movies = await dbConfig.bancoDeDados("filmes")
        response.status(200).send(movies)

    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

//função getById retorna um filme de um id especifico
const getById = async (request, response) => {
    try {
        let movies = await dbConect()
        //const movies = await dbConfig.bancoDeDados("filmes")

        // acessar o id que vem da requisição
        let requestedId = request.params.id
        console.log(requestedId)

        // achar o item da lista que possui o mesmo id que veio da requisição
        let foundMovie = movies.find(filme => filme.id == requestedId)
        console.log(foundMovie)

        if(foundMovie == undefined) throw new Error("id não encontrado")

        // retornar uma resposta
        response.status(200).send(foundMovie)
    }
    catch(error){
        response.status(500).json({message: error.message})
    }
}

//função getByGender retorna um filme de um gênero especifico
const getByGender = async (request, response) => {
    try {
        let movies = await dbConect()

        // acessar o gênero desejado que vem na requisição
        const requestedGenre = request.query.genre
        // console.log(requestedGenre)

        // procurar na minha lista de filmes os filmes que possuem aquele gênero
        const filteredMovies = movies.filter( filme =>
            filme.Genre.includes(requestedGenre)
        )

        // retornar esses filmes como resposta
        response.status(200).send(filteredMovies)
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

const createMovie = async (request, response) => {
    try {
        let movies = await dbConect()
        // acessar determinadas informações do body da requisição
        let body = request.body

        // construo um novo filme com as informações obtidas
        let newMovie = {
            id: (movies.length)+1,
            Title: body.Title,
            Plot: body.Plot
        }

        // insiro esse novo filme na minha lista de filmes
        movies.push(newMovie)

        // envio a resposta
        response.status(201).json(
            [
                {
                    "mensagem":"filme cadastrado com sucesso",
                    newMovie
                }
            ]
        )
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

//PATCH atualiza somente o titulo do filme
const updateTitle = async (request, response) => {
    try {
        let movies = await dbConect()

        // pegar o id do filme a ser atualizado 
        const requestedId = request.params.id 

        // acessar o novo título do filme que vem na requisição
        let newTitle = request.body.Title

        // encontrar o filme a ser atualizado
        filteredMovie = movies.find(filme => filme.id == requestedId)

        if(filteredMovie == undefined) throw new Error("id não encontrado")

        // colocar no filme o encontrado o novo valor do título
        filteredMovie.Title = newTitle

        // enviar a resposta
        response.status(200).json(
            [
                {
                    "mensagem": "Filme atualizado com sucesso",
                    filteredMovie
                }
            ]
        )

    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

//PUT substituir tudo de um filme
const updateMovie = async (request, response) =>{
    try {
        let movies = await dbConect()

        // saber qual filme eu preciso atualizar
        const requestedId = request.params.id
        // receber os dados para atualizar esse filme
        let updatedMovie = request.body

        // achar o filme a ser atualizado
        const filteredMovie = movies.find(filme => filme.id == requestedId)

        if(filteredMovie == undefined) throw new Error("id não encontrado")

        const index = movies.indexOf(filteredMovie)

        updatedMovie.id = filmeFiltrado.id

        // substituir no filme a ser atualizado todas as informações
        movies.splice(index, 1, updatedMovie)

        // enviar a resposta
        response.status(200).json([{
            "mensagem": "filme atualizado com sucesso",
            updatedMovie
        }])
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

//DELETE
const deleteMovie = async (request, response) => {
    try {
        let movies = await dbConect()

        // acesso o id que vem da requisição
        const requestedId = request.params.id

        // acho o filme a ser deletado
        const filteredMovie = movies.find(filme => filme.id == requestedId)

        if(filteredMovie == undefined) throw new Error("id não encontrado")

        // achar o indice desse filme na minha lista de filmes
        const index = movies.indexOf(filteredMovie)

        // remover esse item
        movies.splice(index, 1)

        // enviar a resposta
        response.status(200).json([{
            "mensagem": "filme deletado com sucesso",
            filmeFiltrado
        }])
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

//PUT que aceita mais de uma atualização
//put = substituição  e patch = atualização
const updateQualquerCoisa = async (request, response) => {
    let movies = await dbConect()
    //guardar em variaveis o id e o body enviado no request
    const requestedId = request.params.id
    const bodyRequest = request.body

    //encontrar o filme que devera ser atualizada
    const foundMovie = movies.find(filme => filme.id == requestedId)

    //o id e a data Inclusão não podem ser modificados
    //estou garantindo que mesmo que ousuario mande algo nesses campos, nós não alteraremos

    //o id enviado, ou não, no request vai ser o id do item
    bodyRequest.id = foundMovie.id

    //OBJECT.KEYS(OBJETO) retorna uma lista(array) das chaves do objeto
    // o forEach esta percorrendo por essa array de chaves
    Object.keys(foundMovie).forEach((chave)=>{
        //SE o body não tiver uma das chaves
        //por exemplo: enviou um body só com "nome" e sem a descricao
        if(bodyRequest[chave] == undefined){
            //não altera a filme encontrada
            foundMovie[chave] = foundMovie[chave]

        //SENÃO atualizar o valor da chave do item
        } else {
            //por exemplo: filmeEncontrado.Nome = bodyRequest.Nome
            foundMovie[chave] = bodyRequest[chave]
        }
    })

    response.status(200).json(
        [
            {
                "message": "Filme atualizado",
                foundMovie
            }
        ]
        )
}

//exportando todas os funções do controller para ser usada no filmesRoutes.js
module.exports = {
    getAll,
    getById,
    createMovie,
    updateTitle,
    updateMovie,
    deleteMovie,
    updateQualquerCoisa,
    getByGender
}