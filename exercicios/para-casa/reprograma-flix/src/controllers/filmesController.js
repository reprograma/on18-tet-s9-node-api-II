// invocando no nosso projeto o banco de dados 
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

const postNovoFilme = async (request, response)=>{
    
    let filmesJson = await dbConnect()
    let bodyRequest = request.body
    console.log(filmes.length) 

    let novoFilme = {
        id:(filmes.length)+1,
        title:bodyRequest.title,
        description: bodyRequest.description
    }

    filmesJson.push(novoFilme)

    response.status(201).send({
        mensagem: "Filme cadastrado com sucesso!",
        data: novoFilme
    })

}
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

        const indiceDoFilmeEncontradoPorId = filmesJson.indexOf(filmeEncontradoPorId)

        let filmeQueSubstituira = {
            id: (idRequest),
            title: bodyRequest.title,
            description: bodyRequest.description
        }

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


module.exports = {
    getAll,
    getById,
    getTitle,
    getByGenre,
    postNovoFilme,
    updateTitulo,
    updateCompleto,
    updateGenerico
}