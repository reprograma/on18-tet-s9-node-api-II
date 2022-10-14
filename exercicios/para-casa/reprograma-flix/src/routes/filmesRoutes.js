let dbConfig = require("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("filmes")
}

const getAll = async (resquest, response) =>{
    try {
        let filmesJson = await dbConfig.bancoDeDados("filmes")
        response.status(200).send(filmesJson)
    }
    catch(error) {
        response.status(500).json({mensage: error.mensage})
    }
}

// filtrar por titulo
const getByTitle = async(request, response) =>{
    try {
        let filmesJson = await dbConfig.bancoDeDados("filmes")
        let tituloRequest = request.query.titulo.toLowerCase() 

        let encontraFilmepeloTitulo = filmesJson.find(filme =>filme.id == tituloRequest)
        if(encontraFilmepeloTitulo == undefined) throw new Error 

    } catch (error) {
        response.status(404).json({mensage: error.mensage})
    }
}
//filtrar por id 
const getByID = async(request, response) =>{
    try {
        let filmesJson = await dbConfig.bancoDeDados("filmes")
        let idRequest = request.params.id 

        let encontraFilmepeloID = filmesJson.find(filme =>filme.id == idRequest)
        if(encontraFilmepeloID == undefined) throw new Error 

    } catch (error) {
        response.status(404).json({mensage: error.mensage})
    }
}

//filtrar por genero

const getByGenre = async (request, response) =>{
    try {
        const filmesJson= await dbConnect()
        const generoRequest = request.query.genero
        const filmesFiltrados = filmesJson.map(filme.genre.includes (generoRequest))
        response.status(200).send(filmesFiltrados)
    } catch (error){
        response.status(500).json({mensage: error.mensage})
    }
}

//cadastrar novo filme usando post

const cadastrarFilme = async (request, response) => {
    try {
        let filmesJson = await dbConnect()
        let bodyRequest = request.body

        let novoFilmeCadastrado = bodyRequest
        novoFilmeCadastrado.id = (filmesJson.lenght)+1

        filmes.push(novoFilmeCadastrado)

        response.status(202).send({
            mensagem: "filme cadastrado com sucesso, uhuuul!! parabéns", novoFilmeCadastrado
        })
    } catch (error){
        response.status(500).json({mensage: error.mensage})
    }
}

// editar titulo com patch
const editarTitutloFilme = async(request,response) =>{
    try {
        let filmesJson = await dbConnect()

        let idRequest = request.params.id
        let novoTituloCadastrado = request.body.Title

        let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

        filmeEncontrado.Title = novoTituloCadastrado

        response.status(200).json({
            "mensagem": "titulo atualizado com sucesso uhuuuul",
            "filmes-atualizado": filmeEncontrado
        })
    } catch (error){
        response.status(500).json({
            mensage: error.mensage})
    }
}

//substituit as informações de qualqer filme

const substituitFilme = async (request,response) => {
    try {
        let filmesJson = await dbConnect()
        let idRequest = request.parms.id 
        let bodyRequest = request.body
        let filmeEncontrado = filmesJson.find(filme = filme.id == idRequest)
        filmeEncontrado.id = filmeEncontrado.id
        filmeEncontrado.body = bodyRequest

        response.status(204).json({
            "mensagem":"filme atualizado com sucesso, uhuuuuuuuuuuuuuul",
            "filme atualizado": filmeEncontrado 
        })
    }catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}

//editar as informações de qualqer filme usando put

const editarFilmes = async(request, response) =>{
    try {
        const filmesJson = await dbConnect()

        let idRequest = request.params.id
        let bodyRequest = request.body

        const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

        if(filmeEncontrado == undefined) throw new Error("filme nao encontrado")

        bodyRequest.id = filmeEncontrado.id

        let chaves = Object.keys(filmeEncontrado)

        chaves.forEach((chave)=>{
            if(bodyRequest[chave] == undefined){
                filmeEncontrado[chave] = filmeEncontrado[chave]
            } else {
                filmeEncontrado[chave] = bodyRequest[chave]
            }
        })

        response(200).json({"mensagem": "Dados do filme atualizados", filmeEncontrado})

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

module.exports={
    getAll,
    getByID,
    getByGenre,
    getByTitle,
    editarTitutloFilme,
    cadastrarFilme,
    substituitFilme,
    editarFilmes,

}