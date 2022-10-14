const dbConfig = require("../models/dbConfig")

async function dbConnect() {
    return await dbConfig.bancoDeDados("filmes")
}

//Retornar todos os filmes
const getAll = async (request, response) => {
    try {
        let dbFilmes = await dbConnect()
        response.status(200).send(dbFilmes)

    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}
//Retornar filmes por ID
const getById = async (request, response) => {
    try {
        let dbFilmes = await dbConnect()
        let idRequest = request.params.id

        let filmeEncontradoPorId = dbFilmes.find(filme => filme.id == idRequest)

        if (filmeEncontradoPorId === undefined) throw new Error("ID não encontrado")

        response.status(200).send(filmeEncontradoPorId)

    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}
//Retornar filmes por titulo
const getByTitulo = async (request, response) => {
    try {
        dbFilmes = await dbConnect()
        let tituloRequest = request.query.titulo

        let tituloDoFilme = dbFilmes.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))

        if (tituloDoFilme === undefined) throw new Error("Titulo não encontrado")

        response.status(200).send(tituloDoFilme)

    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}
//Retornar filmes por genero
const getByGenre = async (request, response) => {
    try {
        const dbFilmes = await dbConnect()
        const generoRequest = request.query.genero

        const filmesFiltrados = dbFilmes.filter(filme => filme.Genre.toLowerCase().includes(generoRequest))

        if (filmesFiltrados == 0) throw new Error("Gênero não encontrado")

        response.status(200).send(filmesFiltrados)

    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}
//PUT//Criar novo filme
const createFilme = async (request, response) => {
    const dbFilmes = await dbConnect()
    let bodyRequest = request.body

    let novoFilme = {
        id: (dbFilmes.length) + 1,
        title: bodyRequest.Title,
        year: bodyRequest.Year,
        released: bodyRequest.Released,
        runtime: bodyRequest.Runtime,
        genre: bodyRequest.Genre,
        director: bodyRequest.Director,
        writer: bodyRequest.Writer,
        actors: bodyRequest.Actors,
        plot: bodyRequest.Plot,
        language: bodyRequest.Language,
        country: bodyRequest.Country,
        awards: bodyRequest.Awards
    }

    dbFilmes.push(novoFilme)

    response.status(201).send({ "message": "Filme cadastrado com sucesso!", novoFilme })
}
//PATCH//Atualizar titulo
const updateTitle = async (request, response) => {
    try{
    dbFilmes = await dbConnect()

    let idRequest = request.params.id
    let novoTitulo = request.body.Title

    let filmeEncontrado = dbFilmes.find(filme => filme.id == idRequest)

    if (filmeEncontrado == undefined) throw new Error("Filme não encontrado")

    filmeEncontrado.Title = novoTitulo

    response.status(200).json({
        "message": "Titulo atualizado com sucesso!",
        "filme-atualizado": filmeEncontrado
    })
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}
//PUT//Substituir tudo
const updateAll = async (request, response) => {
    try {
        const dbFilmes = await dbConnect()

        let idRequest = request.params.id
        let bodyRequest = request.body

        let filmeEncontrado = dbFilmes.find(filme => filme.id == idRequest)
        if (filmeEncontrado == undefined) throw new Error("Filme não encontrado")

        const indice = dbFilmes.indexOf(filmeEncontrado)

        dbFilmes.splice(indice, 1, bodyRequest)
        response.status(200).send({
            "message": "Filme atualizado com sucesso!", "Filme atualizado": bodyRequest
        })
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}
//PUT//Atualizar qualquer chave do filme
const updateGenerico = async (request, response) => {
    try {
        const dbFilmes = await dbConnect()

        let idRequest = request.params.id
        let bodyRequest = request.body

        const filmeEncontrado = dbFilmes.find(filme => filme.id == idRequest)

        if (filmeEncontrado == undefined) throw new Error("Filme não encontrado")

        bodyRequest.id == filmeEncontrado.id

        let chaves = Object.keys(filmeEncontrado)

        chaves.forEach((chave) => {
            if (bodyRequest[chave] == undefined) {
                filmeEncontrado[chave] = filmeEncontrado[chave]
            } else {
                filmeEncontrado[chave] = bodyRequest[chave]
            }
        })

        response.status(200).send({ "message": "Filme atualizado", filmeEncontrado })

    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

//exportar funções
module.exports = {
    getAll,
    getById,
    getByTitulo,
    updateGenerico,
    getByGenre,
    createFilme,
    updateAll,
    updateTitle
}