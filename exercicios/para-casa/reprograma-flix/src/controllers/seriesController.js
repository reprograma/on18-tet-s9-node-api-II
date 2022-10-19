// INVOCANDO O BANCO DE DADOS NO PROJETO
const { response, request } = require("../app")
const dbConfig = require("../models/dbConfig")

// FUNÇÃO PARA RETORNAR TODAS AS SERIES - OK!
const getAll = async(request, response)=>{
    try {
        let seriesJson = await dbConfig.bancoDeDados("series")
        
        response.status(200).send(seriesJson)

    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

// RETORNA AS SERIES POR ID
   const getById = async(request, response)=>{
    try {
        let seriesJson = await dbConfig.bancoDeDados("filmes")
        let idRequest = request.params.id

        let buscarSeriePeloId = seriesJson.find(serie => serie.id == idRequest)

        if(buscarSeriePeloId == undefined) throw new Error("Serie não encontrada/existente")

        response.status(200).send(buscarSeriePeloId)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
   }
// RETORNAR POR SERIES POR TITULO - OK!
const getByTitle = async (request, response)=>{
    try {
        let seriesJson = await dbConfig.bancoDeDados("series")

        let tituloRequest = request.query.titulo.toLowerCase()

        let encontraSeriePorTitulo = seriesJson.filter(serie => serie.title.toLowerCase().includes(tituloRequest))

        console.log(encontraSeriePorTitulo)

        if(encontraSeriePorTitulo == undefined) throw new Error("Serie não encontrada.")

        response.status(200).send(encontraSeriePorTitulo)

    } catch (error){
        response.status(404).json({message: error.message})
    }
}
// RETORNAR SERIES POR GENERO - NÃO RETONAR
const getByGenero = async (request, response)=>{
    try {
        let seriesJson = await dbConfig.bancoDeDados("series")
        let generoRequest = request.query.genero

        let encontraSeriePorGenero = seriesJson.filter(serie => serie.genre.toString().includes(generoRequest))

        console.log(encontraSeriePorGenero)

        if(encontraSeriePorGenero == undefined) throw new Error("Serie não encontrada.")

        response.status(200).send(encontraSeriePorGenero)

    } catch (error){
        response.status(404).json({message: error.message})
    }
}
// CADASTRAR NOVA SERIE - OK!
const postSerieNova = async (request, response)=>{

    let seriesJson = await dbConfig.bancoDeDados("series")
    let bodyRequest = request.body
    let series = seriesJson

    console.log(series.length)

    let novaSerie = {
        id: (series.length)+1,
        title: bodyRequest.title,
        description: bodyRequest.description
    }

    series.push(novaSerie)

    response.status(201).send({
        mensagem: "Serie cadastrada com sucesso!",
        novaSerie
    })
}
// EDITAR TITULO DE QUALQUER SERIE - OK!
const patchNewtitulo = async (request, response)=>{
    try {
    const seriesJson = await dbConfig.bancoDeDados("series")

    let idRequest = request.params.id
    let novoTitulo = request.body.title

    const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

    serieEncontrada.title = novoTitulo

    response.status(200).json({
        "mensagem": "Titulo atualizado com sucesso!",
        "titulo-atualizado": serieEncontrada
    })
} catch (error){
    response.status(500).json({message: error.message})
}
}
//  SUBSTITUIR QUALQUER COISA DA SERIE - OK!
const putSerieCompleta = async (request, response)=>{

    const seriesJson = await dbConfig.bancoDeDados("series")

    let bodyRequest = request.body
    let idRequest = request.params.id

    const serieEncontradaPorId = seriesJson.find(serie => serie.id == idRequest)

    const indiceDaSerieEncontradaPorId = seriesJson.indexOf(serieEncontradaPorId)

    let serieQueSubstituira = {
        id: (idRequest),
        title: bodyRequest.title,
        description: bodyRequest.description
    }
    //ARRAY.splice(INDICE, NUMERO DE ITENS Q QUEREMOS DELETAR, E O QUE VAI INCLUIR)
    seriesJson.splice(indiceDaSerieEncontradaPorId, 1, serieQueSubstituira)

    response.status(200).json({
        "mensagem": "Serie completamente atualizada com sucesso!", serieQueSubstituira})

}

// PUT GENERICO
const putGenerico = async (request, response)=>{
    try {
        const seriesJson = await dbConfig.bancoDeDados("series")

        let idRequest = request.params.id
        let bodyRequest = request.body

        const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

        if(serieEncontrada == undefined) throw new Error("Serie não encontrada.")

        bodyRequest.id = serieEncontrada.id

        let chaves = Object.keys(serieEncontrada)

        chaves.forEach((chave)=>{
            if(bodyRequest[chave] == undefined){
                serieEncontrada[chave] == serieEncontrada[chave]
            }else {
                serieEncontrada[chave] = bodyRequest[chave]
            }
        })

        response.status(200).json({"mensagem": "Serie atualizada.", serieEncontrada})

    } catch (error){
        response.status(404).json({message: error.message})
    }
}
   module.exports = {
    getAll,
    getById,
    getByTitle,
    getByGenero,
    postSerieNova,
    patchNewtitulo,
    putSerieCompleta,
    putGenerico
   }