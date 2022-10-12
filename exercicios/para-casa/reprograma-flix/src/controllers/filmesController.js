// Invocando o banco de dados no projeto
dbConfig = require("../models/dbConfig")

async function dbConnect() {
    return await dbConfig.bancoDeDados("filmes")
}

// Função getAll para retornar todos os filmes 
const getAll = async(request, response) => {
    try {
        let filmesJson = await dbConnect()
        response.status(200).send(filmesJson)

    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

// Função getById para retornar o filme selecionado pelo ID
const getById = async (request, response) => {
    try {
        let filmesJson = await dbConnect()
        let idRequest = request.params.id

        let encontraFilmePeloId = filmesJson.find(filme => filme.id == idRequest)

        if(encontraFilmePeloId == undefined) throw new Error("filme não encontrado")

        response.status(200).send(encontraFilmePeloId)

    } catch (error) {
        response.status(404).json({message: error.message})
        
    }
}

// Função getByTitle para retornar o filme selecionado pelo titulo
const getByTitle = async (request, response) => {
    try {
        let filmesJson = await dbConnect()
        let tituloRequest = request.query.titulo.toLowerCase()
        
        let pesquisarTitulo = filmesJson.filter((filme) => filme.Title.toLowerCase().includes(tituloRequest))

        if(pesquisarTitulo.length == 0) throw new Error("Filme não encontrado")

        response.status(200).send(pesquisarTitulo)
    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

// Função getByGenre para retornar o filme selecionado pelo genero
const getByGenre = async (request, response) => {
    try {
        let filmesJson = await dbConnect()
        let tituloRequest = request.query.genero.toLowerCase()
        
        let pesquisarTitulo = filmesJson.filter((filme) => filme.Genre.toLowerCase().includes(tituloRequest))

        if(pesquisarTitulo.length == 0) throw new Error("Filme não encontrado")

        response.status(200).send(pesquisarTitulo)
    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

// Função POST para cadastrar novo filme

const postMovie = async (request, response) => {
    let bodyRequest = request.body
    let filmesJson = await dbConnect()

    let filmes = filmesJson

    console.log(filmes.length)

    let novoFilme = {
        id: (filmes.length)+1,
        title: bodyRequest.title,
        description: bodyRequest.description
    }

    filmes.push(novoFilme)

    response.status(201).send({
        mensagem: "Filme cadastrado com sucesso!",
        novoFilme
    })
}

// Função PUT para aceitar qualquer atualização de um filme
const updateGenerico = async (request, response)=>{
    try {
        const filmesJson = await dbConnect()

        let idRequest = request.params.id
        let bodyRequest = request.body

    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    if(filmeEncontrado == undefined) throw new Error("filme não encontrado")

    bodyRequest.id = filmeEncontrado.id//garante que independente do que for mandado no body o id não seja alterado

    let chaves = Object.keys(filmeEncontrado) //retorna uma lista com as chaves que existem no json

    //ARRAY.forEach((item)=>{ codigo })
    chaves.forEach((chave)=>{
        //SE o body da request não tiver uma das chaves 
        if(bodyRequest[chave] == undefined){
            filmeEncontrado[chave] = filmeEncontrado[chave]
        //SENÃO, ou seja, se no body vier uma chave que existe no json    
        }else{
            filmeEncontrado[chave] = bodyRequest[chave]
        }
    })

    response.status(200).json({"mensagem": "Filme atualizado com sucesso!", filmeEncontrado})
        
    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

const patchEdit = async (request, response)=>{
    
    const filmesJson = await dbConnect()

    let idRequest = request.params.id
    let novoTitulo = request.body.Title

    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    filmeEncontrado.Title = novoTitulo

    response.status(200).json({
        "mensagem": "titulo atualizado com sucesso",
        "filme-atualizado": filmeEncontrado
    })
}

// Exportar as funções do controller
module.exports= {
    getAll,
    getById,
    getByTitle,
    getByGenre,
    postMovie,
    updateGenerico,
    patchEdit
}