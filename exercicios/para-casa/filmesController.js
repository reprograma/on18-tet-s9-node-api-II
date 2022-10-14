const { response } = require("express")
const { request } = require("../app")
const dbConfig = require("../models/dbConfig")

async function dbConnect(){
  return await dbConfig.bancoDeDados("filmes")
}
//função pra retornar todos os filmes

const getAll = async (request, response)=>{
  try{
   //let filmesJson = await dbConfig.bancoDeDados("filmes")
   let filmesJson = await dbConnect
   response.status(200).send(filmesJson)
 }catch(error){
    response.status(500).json({message: error.message})
 }
}

const getById = async (request, response) => {
try{
  let filmesJson = await dbConnect
  let idRequest = request.params.id

  let encontrarPorId = filmesJson.find(filme => filme.id == idRequest)

  if(encontrarPorId == undefined) throw new Error("Filme não encontrado")

  response.status(200).send(encontrarPorId)
}catch(error){
   response.status(404).json({message: error.message})
}
}

const getByGenre = async(request, response)=>{
  try {
      const filmesJson = await dbConnect()
      const generoRequest = request.query.genero

      const filmesFiltrados = filmesJson.filter(filme => filme.genre.toString().includes(generoRequest))

      response.status(200).send(filmesFiltrados)

  } catch (error) {
      response.status(404).json({message: error.message})
  }
}

const getByTitle = async(request, response) => {
  try{
    const filmesJson = await dbConnect()
    const titleRequest = request.query.titulo

    let encontrarPorTitulo = filmesJson.filter(filme => filme.Title == titleRequest)
    if(encontrarPorTitulo == undefined) throw new Error("Filme não encontrado")

  response.status(200).send(encontrarPorTitulo)
}catch(error){
   response.status(404).json({message: error.message})
}
}

// Fução pra aceitar qualquer atualização
const updateGenerico = async (request, response) => {
  try{
    const filmesJson = await dbConnect()

    let idRequest = request.params.id 
    let bodyRequest = resquest.body 

    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    if(filmeEncontrado == undefined) throw new Error("Filme não encontrado")

    bodyRequest.id = filmeEncontrado.id

    let chaves = Object.keys(filmeEncontrado)

    chaves.forEach((chave)=>{
      if(bodyRequest[chave] == undefined){
        filmeEncontrado[chave] = filmeEncontrado[chave]
      }else{
        filmeEncontrado[chave] = bodyRequest[chave]
    }
    })

    response.status(200).json({"mensagem": "filme atualizado", filmeEncontrado})

  }catch(error){
    response.status(404).json({message: error.message})
  }
}

const postFilme = async (request, response) => {
    const filmesJson = await dbConnect()

    let bodyRequest = request.body
    let novoFilme = {
      "id": bodyRequest.id,
      "Title": bodyRequest.Title,
      "Year":bodyRequest.Year,
      "Rated":bodyRequest.Rated,
      "Released":bodyRequest.Released,
      "Runtime":bodyRequest.Runtime,
      "Genre":bodyRequest.Genre,
      "Director":bodyRequest.Director,
      "Writer": bodyRequest.Writer,
      "Actors": bodyRequest.Actors,
      "Plot":bodyRequest.Plot,
      "Language":bodyRequest.Language,
      "Country":bodyRequest.Country,
      "Awards":bodyRequest.Awards
    }

    filmesJson.push(novoFilme)
    response.status(201).send({mensagem: "Filme cadastrado com sucesso"})
  }


const patchNome = async(request, response) => {
  try{
    const filmesJson = await dbConnect()

    let novoTitulo = request.body.Title
    let idRequest = request.params.id

    let nomeEditado = filmesJson.find(filme => filme.id == idRequest)

    nomeEditado.Title = novoTitulo

    if(nomeEditado == undefined) throw new Error("Filme não encontrado")

    response.status(200).json({
      "mensagem": "Nome atualizado com sucesso",
      "novo título": nomeEditado})
  }catch(error){
     response.status(404).json({message: error.message})
  }
 }

 const putfilme = async (request, response) => {
  try{
    const filmesJson = await dbConnect()

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

module.exports ={
    getAll,
    getById,
    getByGenre,
    getByTitle,
    updateGenerico,
    postFilme,
    patchNome,
    putfilme
}