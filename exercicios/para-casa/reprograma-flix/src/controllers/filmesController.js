const dbConfig = require("../models/dbConfig")

async function dbConnect() {
    return await dbConfig.bancoDeDados("filmes")
}

//GET que retorna todos os filmes
const getAll = async(request, response)=>{
    try {
        let filmesJson = await dbConnect()

       response.status(200).send(filmesJson)

    } catch (error){
       response.status(500).json({message: error.message})
    }
}

//GET que retorna o filme com id selecionado
const getById = async (request, response)=>{
    try {
        let filmesJson = await dbConnect()
        let idRequest = request.params.id

        let encontraFilmePeloId = filmesJson.find(filme => filme.id == idRequest)

        if(encontraFilmePeloId == undefined) throw new Error("filme não encontrado")

        response.status(200).send(encontraFilmePeloId)

    } catch (error){
        response.status(404).json({message: error.message})
    }
}

//GET que retorna o filme com titulo selecionado
const getByTitulo = async (request, response)=>{
    try {
        let filmesJson = await dbConnect()
        let tituloRequest = request.query.titulo.toLowerCase()

        let encontraFilmePeloTitulo = filmesJson.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))

        console.log(encontraFilmePeloTitulo)

        if(encontraFilmePeloTitulo == undefined) throw new Error("Filme não encontrado.")

        response.status(200).send(encontraFilmePeloTitulo)

    } catch (error){
        response.status(404).json({message: error.message})
    }
}

//GET por query params: retorna o filme com genero selecionado
const getByGenero = async (request, response)=>{
    try {
        let filmesJson = await dbConnect()
        let generoRequest = request.query.genero

        let encontraFilmePeloGenero = filmesJson.filter(filme => filme.Genre.toString().includes(generoRequest))

        console.log(encontraFilmePeloGenero)

        if(encontraFilmePeloGenero == undefined) throw new Error("Filme não encontrado.")

        response.status(200).send(encontraFilmePeloGenero)

    } catch (error){
        response.status(404).json({message: error.message})
    }
}


//POST que cadastra um novo filme
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
        mensagem: "Filme cadastrado com sucesso!",
        novoFilme
    })

}

//PATCH que vai editar o titulo de qualquer um dos filmes
const updateTitulo = async (request, response)=>{
    try {
    const filmesJson = await dbConnect()

    let idRequest = request.params.id
    let novoTitulo = request.body.Title

    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    filmeEncontrado.Title = novoTitulo

    response.status(200).json({
        "mensagem": "Titulo atualizado com sucesso!",
        "titulo-atualizado": filmeEncontrado
    })
} catch (error){
    response.status(500).json({message: error.message})
}
}

//PUT que vai substituir tudo de um filme
const updateCompleto = async (request, response)=>{
        const filmesJson = await dbConnect()

        let bodyRequest = request.body
        let idRequest = request.params.id

        const filmeEncontradoPorId = filmesJson.find(filme => filme.id == idRequest)

        //pegar o indice do filme que sera substituido
        const indiceDoFilmeEncontradoPorId = filmesJson.indexOf(filmeEncontradoPorId)

        let filmeQueSubstituira = {
            id: (idRequest),
            title: bodyRequest.title,
            description: bodyRequest.description
        }

        //ARRAY.splice(INDICE, NUMERO DE ITENS Q QUEREMOS DELETAR, E O QUE VAI INCLUIR)
        filmesJson.splice(indiceDoFilmeEncontradoPorId, 1, filmeQueSubstituira)

        response.status(200).json({
            "mensagem": "Filme completamente atualizado com sucesso!", filmeQueSubstituira})

}

//PUT que vai aceitar qualquer atualização
const updateGenerico = async (request, response)=>{
    try {
        const filmesJson = await dbConnect()

        let idRequest = request.params.id
        let bodyRequest = request.body

        const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

        if(filmeEncontrado == undefined) throw new Error("Filme não encontrado.")

        bodyRequest.id = filmeEncontrado.id

        let chaves = Object.keys(filmeEncontrado)

        chaves.forEach((chave)=>{
            if(bodyRequest[chave] == undefined){
                filmeEncontrado[chave] == filmeEncontrado[chave]
            }else {
                filmeEncontrado[chave] = bodyRequest[chave]
            }
        })

        response.status(200).json({"mensagem": "Filme atualizado.", filmeEncontrado})

    } catch (error){
        response.status(500).json({message: error.message})
    }
}

//exportar as funções do controller
module.exports ={
    getAll,
    getById,
    getByTitulo,
    getByGenero,
    postNovoFilme,
    updateTitulo,
    updateCompleto,
    updateGenerico
}