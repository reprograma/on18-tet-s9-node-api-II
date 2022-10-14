const dbConfig = require("../models/dbConfig")

async function dbConnect(){
  return await dbConfig.bancoDeDados("series")
}

//função pra retornar todos os filmes

const getAll = async (request, response)=>{
 try{
   //let seriesJson = await dbConfig.bancoDeDados("series")
   let seriesJson = await dbConnect
   response.status(200).send(seriesJson)
 }catch(error){
    response.status(500).json({message: error.message})
 }
}

const getById = async(request, response) =>{
  try{
    let seriesJson = await dbConnect
    let idRequest = request.params.id

    let encontrarPorId = seriesJson.find(serie => serie.id == idRequest)

    if(encontrarPorId == undefined) throw new Error("Serie não encontrada")

    response.status(200).send(encontrarPorId)

  }catch(error){
    response.status(404).json({message: error.message})
  }
}

const getByGenre = async(request, response)=>{
  try {
      const seriesJson = await dbConnect()
      const generoRequest = request.query.genero

      const seriesFiltradas = seriesJson.filter(filme => filme.genre.toString().includes(generoRequest))

      response.status(200).send(seriesFiltradas)

  } catch (error) {
      response.status(500).json({message: error.message})
  }
}


const getByTitle = async(request, response) => {
  try{
    const seriesJson = await dbConnect()
    const titleRequest = request.query.titulo

    let encontrarPorTitulo = seriesJson.filter(filme => filme.title == titleRequest)
    if(encontrarPorTitulo == undefined) throw new Error("Filme não encontrado")

  response.status(200).send(encontrarPorTitulo)
}catch(error){
   response.status(404).json({message: error.message})
}
}

const updateGenerico = async (request, response) => {
  try{
    const seriesJson = await dbConnect()

    let idRequest = request.params.id 
    let bodyRequest = resquest.body 

    const serieEncontrada = seriesJson.find(filme => filme.id == idRequest)

    if(serieEncontrada == undefined) throw new Error("Serie não encontrada")

    bodyRequest.id = filmeEncontrado.id

    let chaves = Object.keys(serieEncontrada)

    chaves.forEach((chave)=>{
      if(bodyRequest[chave] == undefined){
        serieEncontrada[chave] = serieEncontrada[chave]
      }else{
        serieEncontrada[chave] = bodyRequest[chave]
    }
    })

    response.status(200).json({"mensagem": "serie atualizada", serieEncontrada})

  }catch(error){

  }
}

const postFilme = async (request, response) => {
  const seriesJson = await dbConnect()

  let bodyRequest = request.body
  let novaSerie = {
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

  seriesJson.push(novaSerie)
  response.status(201).send({mensagem: "Serie cadastrada com sucesso"})
}


const patchNome = async(request, response) => {
try{
  const seriesJson = await dbConnect()

  let novoTitulo = request.body.Title
  let idRequest = request.params.id

  let nomeEditado = seriesJson.find(filme => filme.id == idRequest)

  nomeEditado.Title = novoTitulo

  if(nomeEditado == undefined) throw new Error("Filme não encontrado")

  response.status(200).json({
    "mensagem": "Nome atualizado com sucesso",
    "novo título": nomeEditado})
}catch(error){
   response.status(404).json({message: error.message})
}
}

const putSerie = async (request, response) => {
  try{
    const seriesJson = await dbConnect()

    let idRequest  = request.params.id
    let bodyRequest = request.body

    let serieSubstituida = seriesJson.find(filme => filme.id == idRequest)

    const indice = seriesJson.indexOf(serieSubstituida)

    seriesJson.splice(indice,1, bodyRequest)

 if(serieSubstituida == undefined) throw new Error("Filme não encontrado")

 response.status(200).json({
  "mensagem": "Serie atualizada com sucesso",
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
    putSerie
}