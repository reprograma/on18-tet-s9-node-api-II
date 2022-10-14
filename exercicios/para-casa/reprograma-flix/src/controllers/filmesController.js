const dbConfig = require("../models/dbConfig")

async function dbConnect() {
    return await dbConfig.bancoDeDados("filmes")
}

const getAll = async(request, response)=>{
    try {
        let filmesJson = await dbConnect()

        response.status(200).send(filmesJson)

    } catch (error) {
    response.status(500).json({message: error.message})
    }
}

const getById = async(request, response)=>{
    try {
       let filmesJson = await dbConnect()
       let idRequest = request.params.id
       
       let encontrarFilmePeloId = filmesJson.find(filme => filme.id == idRequest)

       if(encontrarFilmePeloId == undefined) throw new Error ("filme não encontrado")

       response.status(200).send(encontrarFilmePeloId)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

const updateDados = async(request, response)=>{
    try {
        const filmesJson = await dbConnect()

        let idRequest = request.params.id
        let bodyRequest = request.body

    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    
    if(filmeEncontrado == undefined) throw new Error ("filme não encontrado")

    bodyRequest.id = filmeEncontrado.id

    let chaves = Object.keys(filmeEncontrado)

    chaves.forEach((chave)=>{
        if(bodyRequest[chave] == undefined){
            filmeEncontrado[chave] == filmeEncontrado[chave]
        }else{
            filmeEncontrado[chave] = bodyRequest[chave]
        }
    })
        
    response.status(200).json({"mensagem": "filme atualizado", filmeEncontrado})

    } catch (error) {
    response.status(404).json({message: error.message})    
    }
}

const getByGenre = async(request, response)=>{
    try {
      const filmesJson = await dbConnect()
      const filmesRequest = request.query.genero

      const filmesFiltradas = filmesJson.filter(filme => filme.genre.toString().includes(filmesRequest))

      response.status(200).send(filmesFiltradas)  
    } catch (error) {
      response.status(500).json({message: error.message})  
    }
}

module.exports ={
    getAll,
    getById,
    updateDados,
    getByGenre
}

