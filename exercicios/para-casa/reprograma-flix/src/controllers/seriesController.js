const { json } = require("express")
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


//o get por genero, eu não consegui fazer. Vou assistir a resolução e enviar em um segundo commit
// const getByGenre = async(request, response) =>{
//     let seriesJson = dbConnect()
//     let generoRequest = request.query.genero.toLowerCase()
//     let encontraPorGenero = seriesJson.filter(serie => serie.genre.toLowerCase().includes(generoRequest))
//     if(encontraPorGenero.length == 0) throw new Error("Erro")
//     response.status(200).send(encontraPorGenero)
// }



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
    patchTitle,
    putInfo
    // getByGenre
}