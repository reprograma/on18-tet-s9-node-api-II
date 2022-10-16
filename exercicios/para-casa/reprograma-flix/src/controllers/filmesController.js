const dbConfig = require("../models/dbConfig")

async function dbConect() {
    return await dbConfig.bancoDeDados("filmes")     
} 

const getAll = async (request, response) => {
    try {
        let movies = await dbConect()
        
        response.status(200).send(movies)
        
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

const getById = async (request, response) => {
    try {
        let movies = await dbConect()
      
        let requestedId = request.params.id
        console.log(requestedId)

        let foundMovie = movies.find(filme => filme.id == requestedId)
        console.log(foundMovie)

        if(foundMovie == undefined) throw new Error("id não encontrado")
    
        response.status(200).send(foundMovie)
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

        const requestedId = request.params.id
        
        let updatedMovie = request.body

        const filteredMovie = movies.find(filme => filme.id == requestedId)

        if(filteredMovie == undefined) throw new Error("id não encontrado")

        const index = movies.indexOf(filteredMovie)

        updatedMovie.id = filmeFiltrado.id

        movies.splice(index, 1, updatedMovie)

        response.status(200).json([{
            "mensagem": "filme atualizado com sucesso",
            updatedMovie
        }])
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

const deleteMovie = async (request, response) => {
    try {
        let movies = await dbConect()

        const requestedId = request.params.id

        const filteredMovie = movies.find(filme => filme.id == requestedId)

        if(filteredMovie == undefined) throw new Error("id não encontrado")

        const index = movies.indexOf(filteredMovie)

        movies.splice(index, 1)

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