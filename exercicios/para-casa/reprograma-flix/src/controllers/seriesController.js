const dbConfig = require("../models/dbConfig")

async function dbConnect() {
    return await dbConfig.bancoDeDados("series")
}

const getAll = async (request, response) => {
    try {
        let dbSeries = await dbConnect()
        response.status(200).send(dbSeries)

    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const getById = async (request, response) => {
    try {
        let dbSeries = await dbConnect()
        let idRequest = request.params.id

        let serieEncontradaPorId = dbSeries.find(serie => serie.id == idRequest)

        if (serieEncontradaPorId === undefined) throw new Error("ID não encontrado")

        response.status(200).send(serieEncontradaPorId)

    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const getByTitulo = async (request, response) => {
    try {
        dbSeries = await dbConnect()
        let tituloRequest = request.query.titulo

        let tituloDaserie = dbSeries.filter(serie => serie.title.toLowerCase().includes(tituloRequest))

        if (tituloDaserie == 0) throw new Error("Serie não encontrada")

        response.status(200).send(tituloDaserie)

    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const getByGenre = async (request, response) => {
    try {
        const dbSeries = await dbConnect()
        const generoRequest = request.query.genero

        const seriesFiltradas = dbSeries.filter(serie => serie.genre.includes(generoRequest))

        if (seriesFiltradas == 0) throw new Error("Gênero não encontrado")

        response.status(200).send(seriesFiltradas)

    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const createSerie = async (request, response) => {
    const dbSeries = await dbConnect()
    let bodyRequest = request.body

    let novaserie = {
        id: bodyRequest.id,
        title: bodyRequest.title,
        totalSeasons: bodyRequest.totalSeasons,
        genre: bodyRequest.genre,
        writers: bodyRequest.writers,
        poster: bodyRequest.poster,
        actors: bodyRequest.actors
    }

    dbSeries.push(novaserie)

    response.status(201).send({ "message": "serie cadastrada com sucesso!", novaserie })
}

const updateTitle = async (request, response) => {
    try{
    dbSeries = await dbConnect()

    let idRequest = request.params.id
    let novoTitulo = request.body.titulo

    let serieEncontrada = dbSeries.find(serie => serie.id == idRequest)

    if (serieEncontrada == undefined) throw new Error("Serie não encontrada")

    serieEncontrada.title = novoTitulo

    response.status(200).json({
        "message": "Titulo atualizado com sucesso!",
        "serie-atualizada": serieEncontrada
    })
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const updateAll = async (request, response) => {
    try {
        const dbSeries = await dbConnect()

        let idRequest = request.params.id
        let bodyRequest = request.body

        let serieEncontrada = dbSeries.find(serie => serie.id == idRequest)

        if (serieEncontrada == undefined) throw new Error("Serie não encontrada")

        const indice = dbSeries.indexOf(serieEncontrada)

        dbSeries.splice(indice, 1, bodyRequest)
        response.status(200).send({
            "message": "Serie atualizada com sucesso!", "serie atualizada": bodyRequest
        })
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const updateGenerico = async (request, response) => {
    try {
        const dbSeries = await dbConnect()

        let idRequest = request.params.id
        let bodyRequest = request.body

        const serieEncontrada = dbSeries.find(serie => serie.id == idRequest)

        if (serieEncontrada == undefined) throw new Error("Serie não encontrada")

        bodyRequest.id == serieEncontrada.id

        let chaves = Object.keys(serieEncontrada)

        chaves.forEach((chave) => {
            if (bodyRequest[chave] == undefined) {
                serieEncontrada[chave] = serieEncontrada[chave]
            } else {
                serieEncontrada[chave] = bodyRequest[chave]
            }
        })

        response.status(200).send({ "message": "Serie atualizada", serieEncontrada })

    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}


module.exports = {
    getAll,
    getById,
    getByTitulo,
    updateGenerico,
    getByGenre,
    createSerie,
    updateAll,
    updateTitle
}