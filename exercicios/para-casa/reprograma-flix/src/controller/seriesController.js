const { response } = require("express")
const { request } = require("../app")
const dbConfig = require("../models/dbConfig")

async function bdConnect() {
    return await dbConfig.bancoDeDados("series")
}


const getAll = async(request, response) =>{
    try {
        let bdSeries = await bdConnect()
        let seriesRequest = request.params
        response.status(200).send(bdSeries)

    } catch (error) {
        response.status(500).json({mensagem:error.mensagem})
        
    }
}

const getById = async(request, response) =>{
    try {
        let seriesId = await bdConnect()
        let idRequest = request.params.id

        let idEncontrado = seriesId.find(serie => serie.id == idRequest)

        
        if( idEncontrado == undefined) throw new Error("Serie não encontrado!")

        response.status(200).send(idEncontrado)


    } catch (error) {
        response.status(404).json({message: error.message})
        
    }
}

 
const getTitle = async(request, response) =>{
    try {
        let seriesTitle = await bdConnect()
        let titleRequest = request.query.title.toLowerCase()

        let buscarPorTitulo = seriesTitle.filter(serie => serie.title.toLowerCase().includes(titleRequest))

        
        if(buscarPorTitulo.length == 0) throw new Error("Serie não encontrado")
    
        response.status(200).send(buscarPorTitulo)

    } catch (error) {
        response.status(404).json({message: error.message})
        
    }
}

const getGenero = async(request, response) =>{
    try {
        let serieGenero = await bdConnect()
        let generoRequest = request.query.genre.toLowerCase()

        let encontradoPorGenero = serieGenero.filter(serie => serie.Genre.toLowerCase().includes(generoRequest))

        if(encontradoPorGenero.length == 0) throw new Error("Serie não encontrado")

        response.status(200).send(encontradoPorGenero)
        
    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

const postCriar = async(request, response) =>{
    try {
        let bodyRequest = request.body
        let criar = await bdConnect()
        let novaSerie = {
            id: bodyRequest,
            title: bodyRequest.Title,
            Genre: bodyRequest.Genre,
            description: bodyRequest.description
        }

        criar.push(novaSerie)
        response.status(201).send({
            mensagem: "Serie cadastrado com sucesso",
            data: novaSerie
        })

    } catch (error) {
        response.status(500).json({message: error.message})
        
    }
}


const deLete = async(request, response)=>{
    try {
        let deletarSerie = await bdConnect()
    let deLeteRequeste = request.params.id
    let encontraSeries = deletarSerie.series
    
    const seriesEncontrado = deletarSerie.find(serie => serie.id == deLeteRequeste)

     console.log(seriesEncontrado)

    const indice = deletarSerie.indexOf(seriesEncontrado)

    deletarSerie.splice(indice, 1)

    response.status(410).json({
        "mensagem": "Serie foi deletada com sucesso",
        "Serie-deletada": seriesEncontrado
    })

    } catch (error) {
        response.status(500).json({message: error.message})
                
    }

   
}


const paTC = async(request, response) =>{
    try {
       let seriesBancoDados = await bdConnect()
       let serieJs = seriesBancoDados.series

       let serieRequest = request.params.id
       let tituloNovo = request.body.Title

       let serieEncontrado = seriesBancoDados.find(serie => serie.id == serieRequest) 

       serieEncontrado.Title = tituloNovo

    response.status(200).json({
        "mensagem": "titulo atualizado com sucesso",
        "serie-atualizada": serieEncontrado
    })

    } catch (error) {

        response.status(500).json({message: error.message}) 
    }


}

//substituir tudo de um filme
const PtAll = async(request, response)=>{
    try {
        const seriesJS = await bdConnect()
    let serieSub = seriesJS.series 

    let idRequest = request.params.id
    let bodyRequest = request.body

    let encontrarSerie = seriesJS.find( serie => serie.id == idRequest)

    const indice = seriesJS.indexOf(encontrarSerie)

    serieSub.splice(indice, 1, bodyRequest)
    
    response.status(200).json({
        "mensagem": "titulo atualizado com sucesso",
        "Serie-atualizada": encontrarSerie
    })
    } catch (error) {
        response.status(500).json({message: error.message}) 
    }

}


const upDAT = async(request, response) =>{
    try {
        const serieJs = await bdConnect()

        let idRequest = request.params.id
        let bodyRequest = request.body

    const encontraSeries = serieJs.find(serie => serie.id == idRequest)

    if(encontraSeries.length == 0) throw new Error("Serie não encontrada")

    bodyRequest.id == encontraSeries.id

    let chaves = Object.keys(encontraSeries)

    chaves.forEach((chave)=> {
     
        if(bodyRequest[chave] == undefined){

            encontraSeries[chave] = encontraSeries[chave]
         }else{
            encontraSeries[chave] = bodyRequest[chave]
         }
    })

   response.status(200).json({
        "mensagem": "Serie atualizada", encontraSeries
    })
   

    } catch (error) {
        response.status(500).json({message: error.message})
        
    }

}








module.exports = {

    getAll,
    getById,
    getTitle,
    getGenero,
    postCriar,
    deLete,
    paTC,
    upDAT,
    PtAll 
}