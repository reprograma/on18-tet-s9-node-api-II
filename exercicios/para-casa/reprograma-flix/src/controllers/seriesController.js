const dbConfig = require("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("series")
}
const getAll = async(request,response) =>{
    try {
        let seriesJson = await dbConnect()
        response.status(200).send(seriesJson)
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}
const getById = async(request,response) => {
    try{
        let seriesJson = await dbConnect()

        let idRequest = request.params.id
        let encontrarSeriesPorId = seriesJson.find(serie => serie.id == idRequest)
        if(encontrarSeriesPorId == undefined) throw new Error("Serie não encontrado")
        response.status(200).send(encontrarSeriesPorId)
    }catch(error){
    response.status(404).json({message: error.message})
    }
}
const getTitle =  async (request, response)=>{

    try {

        let seriesJson = await dbConnect()
        let tituloRequest = request.query.titulo.toLowerCase()
        let seriesEncontradoPorTitulo = seriesJson.filter(serie => serie.Title.toLowerCase().includes(tituloRequest))
        console.log(seriesEncontradoPorTitulo)

        if (seriesEncontradoPorTitulo.length == 0 ) throw new Error("filme não encontrado")

        response.status(200).send(seriesEncontradoPorTitulo)

    } catch (error) {
        response.status(404).json({message: error.message})
    }

}
const getByGenero = async (request, response)=>{
    try {
        let seriesJson = await dbConnect()
        let generoRequest = request.query.genero

        let encontraSeriePeloGenero = seriesJson.filter(serie => serie.genre.toString().includes(generoRequest))

        console.log(encontraSeriePeloGenero)

        if(encontraSeriePeloGenero == undefined) throw new Error("Serie não encontrada.")

        response.status(200).send(encontraSeriePeloGenero)

    } catch (error){
        response.status(404).json({message: error.message})
    }
}


//POST que cadastra uma nova serie
const postNovaSerie = async (request, response)=>{

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
        mensagem: "Serie cadastrada com sucesso!",
        novaSerie
    })

}

//PATCH que vai editar o titulo de qualquer uma das series
const updateTitulo = async (request, response)=>{
    try {
    const seriesJson = await dbConnect()

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

//PUT que vai substituir tudo de uma serie
const updateCompleto = async (request, response)=>{
    const seriesJson = await dbConnect()

    let bodyRequest = request.body
    let idRequest = request.params.id

    const serieEncontradaPorId = seriesJson.find(serie => serie.id == idRequest)

    const indiceDaSerieEncontradaPorId = seriesJson.indexOf(serieEncontradaPorId)

    let serieQueSubstituira = {
        id: (idRequest),
        title: bodyRequest.title,
        description: bodyRequest.description
    }

    seriesJson.splice(indiceDaSerieEncontradaPorId, 1, serieQueSubstituira)

    response.status(200).json({
        "mensagem": "Serie completamente atualizada com sucesso!", serieQueSubstituira})

}

//PUT que vai aceitar qualquer atualização
const updateGenerico = async (request, response)=>{
    try {
        const seriesJson = await dbConnect()

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
    getTitle,
    getByGenero,
    postNovaSerie,
    updateTitulo,
    updateCompleto,
    updateGenerico
}

