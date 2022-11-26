const dbConfig = require("../models/dbConfig")

async function dbConect() {
    return await dbConfig.bancoDeDados("filmes")     
} 

const getAll = async (request, response) => {
    try {
        let movies = await dbConect()
        //const movies = await dbConfig.bancoDeDados("filmes")
        response.status(200).send(movies)
        
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

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
    
    }
    catch(error){
        response.status(500).json({message: error.message})
    }
}
const getByGender = async (request, response) => {
    try {
        let movies = await dbConect()
        const requestedGenre = request.query.genre
        const filteredMovies = movies.filter( filme =>
            filme.Genre.includes(requestedGenre)
        )
        response.status(200).send(filteredMovies)
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}
const createMovie = async (request, response) => {
    try {
        let movies = await dbConect()
        let body = request.body
        let newMovie = {
            id: (movies.length)+1,
            Title: body.Title,
            Plot: body.Plot
        }
        movies.push(newMovie)
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

const updateTitle = async (request, response) => {
    try {
        let movies = await dbConect()
        const requestedId = request.params.id 
        let newTitle = request.body.Title
        filteredMovie = movies.find(filme => filme.id == requestedId)
        if(filteredMovie == undefined) throw new Error("id não encontrado")
        filteredMovie.Title = newTitle

       
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

const updateQualquerCoisa = async (request, response) => {
    let movies = await dbConect()
   
    const requestedId = request.params.id
    const bodyRequest = request.body
    
    const foundMovie = movies.find(filme => filme.id == requestedId)
        
    bodyRequest.id = foundMovie.id

    
    Object.keys(foundMovie).forEach((chave)=>{
        
        if(bodyRequest[chave] == undefined){
            
            foundMovie[chave] = foundMovie[chave]
            
       
        } else {
            
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