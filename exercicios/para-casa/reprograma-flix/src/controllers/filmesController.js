//invocando no nosso projeto o banco de dados

const dbConfig = require("../models/dbConfig")

async function dbConnect() {
    return await dbConfig.bancoDeDados("filmes")
}

// retornar todos os filmes
const getAll = async(request, response)=>{
    try {
        let filmesJson = await dbConnect()
       

        response.status(200).send(filmesJson)

    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

const getById = async(request, response)=>{
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
//[get] por titulo
const getByTitulo = async (request, response) =>{
    try{
        let filmesJson = await dbConnect()
        let tituloRequest = request.query.titulo.toLowerCase()

        let encontrarFilmePorTitulo = filmesJson.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))
        
        console.log("encontrarFilmesPorTitulo")

        if (encontrarFilmePorTitulo == undefined) throw new Error ("Filme não encontrado.")

        response.status(200).send(encontrarFilmePorTitulo)
    }catch(error){
        response.status(404).json({message: error.message})

    }

    }
    //[get] por genero
    const getByGenero = async (request, response)=>{
        try{
            let filmesJson = await dbConnect()
            let generoRequest = request.query.genero
            let encontraFilmesPorGenero = filmesJson.filter(filme => filme.Genre.toString().includes(generoRequest))
            console.log(encontraFilmesPorGenero)
            if(encontraFilmesPorGenero == undefined) throw new Error("Filme não encontrado.")
            response.status(200).send(encontraFilmesPorGenero)
        }catch(error){
            response.status(404).json({message: error.menssage})
        }
        }
    
//[post] que cadatra filme
const postNovoFilme = async (request, response)=>{

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
        mesagem: "Novo filme cadastrado!",
        novoFilme
    })
}
//[patch] editar o titulo
const updateTitulo = async (request, response)=>{
    try {
    const filmesJson = await dbConnect()
    
    let idRequest = request.params.id
    let novoTitulo = request.body.title

    const filmesEncontrado = filmesJson.find(filme => filme.id == idRequest)

    filmesEncontrado.title = novoTitulo

    response.status(200).json({
        "mesagem": "Titulo atualizado!",
        "titulo-atualizado": filmesEncontrado
    })
    }catch(error){
        response.status(500).json({messge: error.message})
    }

}

//[PUT] que vai aceitar qualquer atualização
const updateGenerico = async (request, response)=>{
    try {
        const filmesJson = await dbConnect()

        let idRequest = request.params.id
        let bodyRequest = request.body

    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    if(filmeEncontrado == undefined) throw new Error("filme não encontrado")

    bodyRequest.id = filmeEncontrado.id//garante que independente do que for mandado no body o id não seja alterado

    let chaves = Object.keys(filmeEncontrado) //retorna uma lista com as chaves que existem no json

    chaves.forEach((chave)=>{
      
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

// [put] completo

const updateCompleto = async(request, response)=>{
    const seriesJson = await dbConnect()

    let bodyRequest = request.body
    let idRequest = request.params.id

    const indiceDaSerieEncontradaPorId = seriesJson.indexOf(indiceDaSerieEncontradaPorId)

    let serieSubistituta = {
        id:(idRequest),
        title: bodyRequest.title,
        description: bodyRequest.description
    }
    seriesJson.splice(indiceDaSerieEncontradaPorId, 1, serieSubistituta)

    response.status(200).json({
        "messagem": "serie completamente atualizada com sucesso!",serieSubistituta
    })
}
//exportar as funções do controller
module.exports ={
    getAll,
    getById,
    getByTitulo,
    getByGenero,
    postNovoFilme,
    updateTitulo,
    updateGenerico,
    updateCompleto
}