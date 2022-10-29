const { json, response } = require("express")
const dbConfig = require("../models/dbConfig")

async function dbConnect() {
    return await dbConfig.bancoDeDados("series")
}

const getAll = async(request, response)=> {
    try {
        let seriesJson = await dbConnect()

        response.status(200).send(seriesJson)

    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}


const getByTitle = async(request, response)=>{
    try {
        let seriesJson = await dbConnect()
        let tituloRequest = request.query.titulo

        let encontraPorTitulo = seriesJson.filter(serie => serie.title.toLowerCase().includes(tituloRequest))

        if(encontraPorTitulo == 0) throw new Error("Serie não encontrada")

        response.status(200).send(encontraPorTitulo)

    } catch (error) {
        response.status(404).json({
            message: error.message
        })
    }

}


const getById = async(request, response) =>{

    try {
        let seriesJson = await dbConnect()
        let idRequest = request.params.id

        let encontraPeloId = seriesJson.find(serie => serie.id == idRequest)

        if(encontraPeloId == undefined) throw new Error("Id não encontrado")

        response.status(200).send(encontraPeloId)
        
    } catch (error) {
        response.status(404).json({
            message: error.message
        })
    }

}

// corrigido:
const getByGenre = async (request, response) =>{
    try {
        const seriesJson =  await dbConnect()
        const generoRequest = request.query.genero

        const seriesFiltradas = seriesJson.filter(filme => filme.genre.toString().toLowerCase().includes(generoRequest))

        response.status(200).send(seriesFiltradas)

    } catch (error) {
        response.status(404).json({
            message: error.message
        })
    }

}

const postNewSeries = async (request, response) => {

    try {
        let seriesJson = await dbConnect()
        let bodyRequest = request.body
        

        let novaSerie = {
            id:(seriesJson.length)+1,
            title: bodyRequest.title,
            totalSeasons: bodyRequest.totalSeasons
        }

        seriesJson.push(novaSerie)

        response.status(201).json({
            messagem: "Serie cadastrada com sucesso!",
            novaSerie
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }

}

// esse put foi feito depois de reassistir aula de revisão.
const putUpdateGenerico = async (request, response) => {
    try {
        let seriesJson = await dbConnect()
        let idRequest = request.params.id
        let bodyRequest = request.body

        let encontraPeloId = seriesJson.find(serie => serie.id == idRequest)

        bodyRequest.id = encontraPeloId.id

        let chaves = Object.keys(encontraPeloId)

        chaves.forEach((chave) => {
            if(bodyRequest[chave] == undefined){
                encontraPeloId[chaves] = encontraPeloId[chave]
            } else {
                encontraPeloId[chave] = bodyRequest[chave]
            }
        })

        response.status(200).json({
            "mensagem": "serie atualizada com sucesso", encontraPeloId
        })


    } catch (error) {
        response.status(404).json({
            message: error.menssage
        })
        
    }

}

const patchTitle = async(request, response) =>{
    let seriesJson = await dbConnect()
    let idRequest = request.params.id 

    let novoTitulo = request.body.title

    let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

    serieEncontrada.title = novoTitulo

    response.status(200).json({
        "message": "Titulo atualizado com sucesso", 
        "serie-atualizada": serieEncontrada})

}


const putInfo = async(request, response) =>{
    let seriesJson = await dbConnect()
    let idRequest = request.params.id
    let bodyRequest = request.body

    let encontraPeloId = seriesJson.find(filme => filme.id == idRequest)

    const indice = seriesJson.indexOf(encontraPeloId)

    seriesJson.splice(indice, 1, bodyRequest)

    response.status(200).json({
        "message": "Serie substituida com sucesso",
        "serie-atualizada": bodyRequest
    })

}



module.exports = {
    getAll, 
    getByTitle,
    getById,
    getByGenre,
    postNewSeries,
    putUpdateGenerico,
    patchTitle,
    putInfo
}