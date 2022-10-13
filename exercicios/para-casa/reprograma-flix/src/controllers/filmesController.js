const { use, router } = require("../app")
const dbConfig = require("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("filmes")
}

const getAll = async(request,response)=>{
    try {
        let filmesJson = await dbConnect()
        response.status(200).send(filmesJson)
    } catch (error) {
        response.status(500).json({message:error.message})
    }
}

const getById = async(request,response) => {
    try{
        let filmesJson = await dbConnect()
        let idRequest = request.params.id
        let encontrarFilmePeloId = filmesJson.find(filme => filme.id == idRequest)
        if(encontrarFilmePeloId == undefined) throw new Error("Filme não encontrado")
        response.status(200).send(encontrarFilmePeloId)
    }catch(error){
    response.status(404).json({message: error.message})
    }
}
const getTitle =  async (request, response)=>{

    try {

        let filmeJson = await dbConnect()
        let tituloRequest = request.query.titulo.toLowerCase()
        let filmeEncontradoPorTitulo = filmeJson.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))
        console.log(filmeEncontradoPorTitulo)

        if (filmeEncontradoPorTitulo.length == 0 ) throw new Error("filme não encontrado")

        response.status(200).send(filmeEncontradoPorTitulo)

    } catch (error) {
        response.status(404).json({message: error.message})
    }

};
const getByGenre = async(request, response)=>{
    try {
        const filmeJson = await dbConnect()
        const generoRequest = request.query.genero

        const filmesPorGenero = filmeJson.filter(filme => filme.Genre.toString().includes(generoRequest))

        response.status(200).send(filmesPorGenero)

    } catch (error) {
        response.status(500).json({message: error.message})
    }
}


module.exports = {
    getAll,
    getById,
    getTitle,
    getByGenre
}