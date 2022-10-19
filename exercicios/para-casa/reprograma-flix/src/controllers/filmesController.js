// INVOCANDO O BANCO DE DADOS NO PROJETO
const { response, request } = require("../app")
const dbConfig = require("../models/dbConfig")

// FUNÇÃO PARA RETORNAR TODOS OS FILMES
const getAll = async(request, response)=>{
    try {
        let filmesJson = await dbConfig.bancoDeDados("filmes")
        
        response.status(200).send(filmesJson)

    } catch (error) {
        response.status(500).json({message: error.message})
    }
}
// RETORNA OS FILMES POR ID
const getById = async(request, response)=>{
    try {
        let filmesJson = await dbConfig.bancoDeDados("filmes")
        let idRequest = request.params.id

        let buscarFilmePeloId = filmesJson.find(filmes => filmes.id == idRequest)

        if(buscarFilmePeloId == undefined) throw new Error("filme não encontrado/existente")

        response.status(200).send(buscarFilmePeloId)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}
// RETORNAR FILMES POR TITULO
const getByTitulo = async(request, response)=>{
    try {
        let filmesJson = await dbConfig.bancoDeDados("filmes")
        let tituloRequest = request.query.titulo.toLowerCase()

        let buscarFilmePorTitulo = filmesJson.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))

        console.log(buscarFilmePorTitulo)

        if(buscarFilmePorTitulo == undefined) throw new Error("Filme não encontrado no catalogo!")

        response.status(200).send(buscarFilmePorTitulo)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}
// RETORNAR FILMES POR GÊNERO 
const getByGenero = async(request, response)=>{
    try {
        let filmesJson = await dbConfig.bancoDeDados("filmes")
        let generoRequest = request.query.genero

        let buscarFilmePorGenero = filmesJson.filter(filme => filme.Genre == generoRequest)

//         console.log(buscarFilmePorGenero)

        if(buscarFilmePorGenero == undefined) throw new Error("Gênero não encontrado!")

        response.status(200).send(buscarFilmePorGenero)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

// CADASTRAR NOVO FILME
const postNewFilme = async(request, response)=> {
    let bodyRequest = request.body
    let filmesJson = await dbConfig.bancoDeDados("filmes")
    let filmes = filmesJson

    console.log(filmes.length)

    let filmeNovo = {
    id: (filmes.length)+1,
    title: bodyRequest.title,
    description: bodyRequest.description
}
    filmes.push(filmeNovo)
    response.status(201).send({messagem: "Filme Cadastrado com Sucesso!", filmeNovo})
}
// EDITAR TITULO DO FILME
const patchNovoTitulo = async(request, response)=>{
    try {
    const filmesJson = await dbConfig.bancoDeDados("filmes")

    let idRequest = request.params.id
    let novoTitulo = request.body.Title

    const tituloEditado = filmesJson.find(filme => filme.id == idRequest)

    tituloEditado.Title = novoTitulo

    if(tituloEditado == undefined) throw new Error("filme não encontrado")
    
    response.status(200).json({
        "mensagem": "Titulo atualizado com Sucesso", 
        "novo titulo": tituloEditado})

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}
// SUBSTITUIR QUALQUER COISA DE UM FILME
const putFilmes = async (request, response) => {
    try{
        const filmesJson = await dbConfig.bancoDeDados("filmes")
    
        let idRequest  = request.params.id
        let bodyRequest = request.body
    
        let filmeSubstituido = filmesJson.find(filme => filme.id == idRequest)
    
        const indice = filmesJson.indexOf(filmeSubstituido)
    
        filmesJson.splice(indice,1, bodyRequest)
    
     if(filmeSubstituido == undefined) throw new Error("Filme não encontrado")
    
     response.status(200).json({
      "mensagem": "Filme atualizado com sucesso",
      "atualização": bodyRequest
     })
    }catch(error){
       response.status(404).json({message: error.message})
    }
    }
    
// FAZER QUALQUER ATUALIZAÇÃO == nao conseguir retornar no insomnia
    const updateGenerico = async (request, response) => {
        try{
          const filmesJson = await dbConfig.bancoDeDados("filmes")
      
          let idRequest = request.params.id 
          let bodyRequest = resquest.body 
      
          const filmeUpDate = filmesJson.find(filme => filme.id == idRequest)
      
          if(filmeUpDate == undefined) throw new Error("Filme não encontrado")
      
          bodyRequest.id = filmeUpDate.id
      
          let chaves = Object.keys(filmeUpDate)
      
          chaves.forEach((chave)=>{
            if(bodyRequest[chave] == undefined){
              filmeUpDate[chave] = filmeUpDate[chave]
            }else{
              filmeUpDate[chave] = bodyRequest[chave]
          }
          })
      
          response.status(200).json({"mensagem": "filme atualizado", filmeUpDate})
      
        }catch(error){
          response.status(404).json({message: error.message})
        }
      }
      
//EXPORTAR AS FUNÇÕES DO CONTROLLER
module.exports = {
    getAll,
    getById,
    getByTitulo,
    getByGenero,
    postNewFilme,
    patchNovoTitulo,
    putFilmes,
    updateGenerico
}