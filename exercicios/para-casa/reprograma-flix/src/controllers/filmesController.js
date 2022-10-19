//invocando no nosso projeto o banco de dados
const dbConfig = require("../models/dbConfig")

async function dbConnect() {
    return await dbConfig.bancoDeDados("filmes")
}

//Todos os filmes
const getAll = async(request, response)=>{
    try {
        let dbFilmes = await dbConnect()

        response.status(200).send(dbFilmes)

    } catch (error) {
        response.status(500).json({message: error.message})
    }
}
//Filme por titulo
const getTitle = async (request, response)=>{
    try {
        let dbFilmes = await dbConnect()
        let tituloRequest = request.query.titulo

        let encontrarPorTitulo = dbFilmes.filmes.filter(filme => filme.Title)

        console.log(encontrarPorTitulo)

        if(encontrarPorTitulo.length == 0) throw new Error("filme não encontrado")
        
        response.status(200).send(encontrarPorTitulo)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

//Filme por ID
const getId = async(request, response)=>{
    try {
        let dbFilmes = await dbConnect()
        let idRequest = request.params.id

        let localizaFilmePeloId = dbFilmes.find(filme => filme.id == idRequest)

        if(localizaFilmePeloId == undefined) throw new Error("Id não encontrado")

        response.status(200).send(localizaFilmePeloId)

    } catch (error) {
        response.status(404).json({message: error.message})        
    }
}
//Filme por gênero/get por query params
const getGenre = async(request, response)=>{
    try {
        const dbFilmes = await dbConnect()
        const generoRequest = request.query.Genre

        const filmesFiltrados = dbFilmes.filter(filme => filme.Genre.includes(generoRequest))

        response.status(200).send(filmesFiltrados)
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}
//Cadastrar filme
const updateCadastro = async (request, response)=>{
    try {
         const dbFilmes = await dbConnect()
         let bodyRequest = request.body
         
         let novoFilme = {
         id: (dbFilmes.length)+1,
         Title: bodyRequest.title,
         Plot: bodyRequest.description
    }
     dbFilmes.push(novoFilme)

    response.status(201).json(
        [{"mensagem":"filme cadastrado com sucesso",
        novoFilme}])
    } catch (erro) {
        response.status(500).json({message: error.message})
    }
}

//metodo PATCH: atualizar somente titulo
const updateTitle = async (request, response)=>{
    const dbFilmes = await dbConnect()

    let idRequest = request.params.id
    let novoTitulo = request.body.Title

    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    filmeEncontrado.Title = novoTitulo

    response.status(200).json({
        "mensagem": "titulo atualizado com sucesso",
        "filme-atualizado": filmeEncontrado
    })
}

//substituir tudo
const updateFilme = async (request, response)=>{
    const dbFilmes = await dbConnect()

    let idRequest = request.params.id
    let bodyRequest = request.body

    let filmeEncontrado = filmesJson.find( filme => filme.id == idRequest)

    const indice = filmesJson.indexOf(filmeEncontrado)

    //ARRAY.splice(INDICE, o item que vamos deletar, o item q vei no lugar)
    filmesJson.splice(indice, 1, bodyRequest)
    response.status(200).json({
        "mensagem": "filme atualizado com sucesso",
        "filme-atualizado": bodyRequest
    })
}

const deleteFilme = async (request, response) => {
    try {
        const dbFilmes = await dbConnect()

        //id da solicitação
        const idRequest = request.params.id

        //encontrar filme a ser deletado
        const filmeFiltrado = dbFilmes.find(filme => filme.id == idRequest)

        if(filmeFiltrado == undefined) throw new Error("id não encontrado")

        //encontrar o indice desse filme(item) na minha lista de filmes
        const indice = dbFilmes.indexOf(filmeFiltrado)

        //remover esse item (a posição, quantidade)
        dbFilmes.splice(indice, 1)

        response.status(200).json([{
            "message":"filme deletado com sucesso",
            filmeFiltrado
        }])
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

// Exportar as funções do controller
module.exports = {
    getAll,
    getTitle,
    getId,
    getGenre,
    updateCadastro,
    updateTitle,
    updateFilme,
    deleteFilme
}
