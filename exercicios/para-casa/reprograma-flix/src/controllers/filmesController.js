const dbConfig = require("../models/dbConfig")

async function dbConnect() {
    return await dbConfig.bancoDeDados("filmes")
}

const getAll = async(request, response) =>{
    try {
        const filmesJson = await dbConnect()

        response.status(200).send(filmesJson)
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

const getById = async(request, response) =>{
    try {
        const filmesJson = await dbConnect()
        let idRequest = request.params.id

        let getFilmeById  = filmesJson.find(filme => filme.id == idRequest)

        if(getFilmeById == undefined) throw new Error("filme não encontrado")


        response.status(200).send(getFilmeById)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

const getByTitle = async(request, response)=> {
    try {
        const filmesJson = await dbConnect()
        let tituloRequest = request.query.titulo.toLowerCase()

        let getFilmeByTitle = filmesJson.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))

        if(getFilmeByTitle.length == 0) throw new Error("filme não encontrado")

        response.status(200).send(getFilmeByTitle)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

const getByGenre = async(request, response)=>{
    try {
        const filmesJson = await dbConnect()
        let generoRequest = request.query.genero.toLowerCase()

        let filmesFiltrados = filmesJson.filter(filme => filme.Genre.toLowerCase().includes(generoRequest))

        if(filmesFiltrados.length == 0) throw new Error("filme não encontrado")

        response.status(200).send(filmesFiltrados)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

const cadastrarNovoFilme = async(request, response)=>{
        const filmesJson = await dbConnect()
        let bodyRequest = request.body

        let novoFilme = {
            id:(filmesJson.length)+1,
            Title: bodyRequest.Title,
            Year: bodyRequest.Year,
            Rated: bodyRequest.Rated,
            Released: bodyRequest.Released,
            Runtime: bodyRequest.Runtime,
            Genre: bodyRequest.Genre,
            Director: bodyRequest.Director,
            Writer: bodyRequest.Writer,
            Actors: bodyRequest.Actors,
            Plot: bodyRequest.Plot,
            Language: bodyRequest.Language,
            Country: bodyRequest.Country,
            Awards: bodyRequest.Awards
        }

        filmesJson.push(novoFilme)

        response.status(201).send({
            message: "Filme cadastrado com sucesso!",
            novoFilme 
        })
    }

const updateTitulo = async(request, response)=>{
    try{
        const filmesJson = await dbConnect()
        let idRequest = request.params.id
        let novoTitulo = request.body.Title
        
        let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
        
        if(filmeEncontrado == undefined) throw new Error("filme não encontrado")
        
        filmeEncontrado.Title = novoTitulo
        
        response.status(200).json({
        "mensagem": "título atualizado com sucesso",
        "filme-atualizado": filmeEncontrado
    })
    } catch(error){
        response.status(404).json({message: error.message})
    }
}

const updateGenerico = async(request, response)=>{
    try {
        const filmesJson = await dbConnect()
        let idRequest = request.params.id
        let bodyRequest = request.body

        filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

        if(filmeEncontrado == undefined) throw new Error("filme não encontrado")

        bodyRequest.id = filmeEncontrado.id

        let chaves = Object.keys(filmeEncontrado)

        chaves.forEach((chave) =>{
            if(bodyRequest[chave] == undefined){
                filmeEncontrado[chave] = filmeEncontrado[chave]
            }else{
                filmeEncontrado[chave] = bodyRequest[chave]
            }
        })

        response.status(200).json({"mensagem": "filme atualizado", filmeEncontrado})

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}


module.exports = {
    getAll,
    getById,
    getByTitle, 
    getByGenre,
    cadastrarNovoFilme,
    updateTitulo,
    updateGenerico
}