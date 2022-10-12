// Invocando o banco de dados no projeto
dbConfig = require("../models/dbConfig")

async function dbConnect() {
    return await dbConfig.bancoDeDados("series")
}

// Função getAll para retornar todas as séries 
const getAll = async(request, response) => {
    try {
        let seriesJson = await dbConnect()
        response.status(200).send(seriesJson)

    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

// Função getById para retornar a serie selecionada pelo ID
const getById = async(request, response)=>{
    try {
        let seriesJson = await dbConnect()
        let idRequest = request.params.id

        let encontraSeriePeloId = seriesJson.find(serie => serie.id == idRequest)

        if(encontraSeriePeloId == undefined) throw new Error("Série não encontrada")

        response.status(200).send(encontraSeriePeloId)

    } catch (error) {
        response.status(404).json({message: error.message})
        
    }
}

// Função getByTitle para retornar a serie selecionada pelo titulo
const getByTitle = async (request, response) => {
    try {
        let seriesJson = await dbConnect()
        let tituloRequest = request.query.titulo.toLowerCase()
        
        let pesquisarTitulo = seriesJson.filter((serie) => serie.title.toLowerCase().includes(tituloRequest))

        if(pesquisarTitulo.length == 0) throw new Error("Série não encontrada")

        response.status(200).send(pesquisarTitulo)
    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

// Função getByGenre para retornar a serie selecionada pelo genero
const getByGenre = async (request, response) => {
    try {
        let seriesJson = await dbConnect()
        let parametros = request.query

        //console.log(parametros)

        const chaves = Object.keys(parametros)

        //console.log(chaves)
        
        const filtrarGenero = seriesJson.filter((serie) => {
            return chaves.some(key => RegExp(parametros[key], 'i').test(serie[key].toString()));
        })

        if(filtrarGenero.length == 0) throw new Error("Gênero da série não encontrado")

        response.status(200).send(filtrarGenero)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

// Função post para cadastrar nova serie

const postSerie = async (request, response) => {
    let bodyRequest = request.body
    let seriesJson = await dbConnect()

    let series = seriesJson

    console.log(series.length)

    let novaSerie = {
        id: (series.length)+1,
        title: bodyRequest.title,
        description: bodyRequest.description
    }

    series.push(novaSerie)

    response.status(201).send({
        mensagem: "Série cadastrada com sucesso!",
        novaSerie
    })
}

// Função PUT para aceitar qualquer atualização de uma série
const updateGenerico = async (request, response)=>{
    try {
        const seriesJson = await dbConnect()

        let idRequest = request.params.id
        let bodyRequest = request.body

    const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

    if(serieEncontrada == undefined) throw new Error("serie não encontrada")

    bodyRequest.id = serieEncontrada.id//garante que independente do que for mandado no body o id não seja alterado

    let chaves = Object.keys(serieEncontrada) //retorna uma lista com as chaves que existem no json

    //ARRAY.forEach((item)=>{ codigo })
    chaves.forEach((chave)=>{
        //SE o body da request não tiver uma das chaves 
        if(bodyRequest[chave] == undefined){
            serieEncontrada[chave] = serieEncontrada[chave]
        //SENÃO, ou seja, se no body vier uma chave que existe no json    
        }else{
            serieEncontrada[chave] = bodyRequest[chave]
        }
    })

    response.status(200).json({"mensagem": "Série atualizada com sucesso!", serieEncontrada})
        
    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

const patchEdit = async (request, response)=>{
    
    const seriesJson = await dbConnect()

    let idRequest = request.params.id
    let novoTitulo = request.body.title

    let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

    serieEncontrada.title = novoTitulo

    response.status(200).json({
        "mensagem": "titulo atualizado com sucesso",
        "serie-atualizada": serieEncontrada
    })
}

// Exportar as funções do controller
module.exports= {
    getAll,
    getById,
    getByTitle,
    getByGenre,
    postSerie,
    updateGenerico,
    patchEdit
}