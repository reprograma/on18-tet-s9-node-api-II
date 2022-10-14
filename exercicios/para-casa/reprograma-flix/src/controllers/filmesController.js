//invocando no nosso projeto o banco de dados
const dbConfig = require("../models/dbConfig")

async function dbConnect() {
    return await dbConfig.bancoDeDados("filmes")
}

//função getAll retornar todos os filmes
const getAll = async(request, response)=>{
    try {
        let filmesJson = await dbConnect()
        response.status(200).send(filmesJson)

    } catch (error) {
        response.status(500).json({message: error.message})
    }
}
//função getByTd retornar os filmes por id
const getById = async(request, response)=>{
    try {
        let filmesJson = await dbConnect()
        let idRequest = request.params.id

        let encontraFilmePeloId = filmesJson.find(filme => filme.id == idRequest)

        if(encontraFilmePeloId == undefined) throw new Error("filme não encontrado")

        response.status(200).send(encontraFilmePeloId)

    } catch (error) {
        response.status(404).json({message: error.message})
        
    }
}
//MÉTODO POST PARA CADASTRAR

const cadastraFilme = async (request, response)=>{
    let bodyRequest = request.body
    let dbFilmes = await bancoDeDados()
    let filmes = dbFilmes.filmes

    console.log(filmes.length)

    let novoFilme = {
        id:(filmes.length)+1,
        Title: bodyRequest.title,
        Plot: bodyRequest.description
    }

    filmes.push(novoFilme)

    response.status(201).send({
        mensagem: "filme cadastrado com sucesso",
        novoFilme
    })

}

//---------feito em aula :
//PUT que vai aceitar qualquer atualização
const updateGenerico = async (request, response)=>{
    try {
        const filmesJson = await dbConnect()

        let idRequest = request.params.id
        let bodyRequest = request.body

    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    if(filmeEncontrado == undefined) throw new Error("filme não encontrado")

    bodyRequest.id = filmeEncontrado.id//garante que independente do que for mandado no body o id não seja alterado

    let chaves = Object.keys(filmeEncontrado) //retorna uma lista com as chaves que existem no json

    //ARRAY.forEach((item)=>{   codigo })
    chaves.forEach((chave)=>{
        //SE o body da request não tiver uma das chaves 
        if(bodyRequest[chave] == undefined){
            filmeEncontrado[chave] = filmeEncontrado[chave]
        //SENÃO, ou seja, se no body vier uma chave que existe no json    
        }else{
            filmeEncontrado[chave] = bodyRequest[chave]
        }
    })

    response.status(200).json({"mensagem": "filme atualizado", filmeEncontrado})
        
    } catch (error) {
        response.status(404).json({message: error.message})
    }
}





//get por genero de series e filmes são diferentes
//Resposta aqui...
//está retornando []
const getFilmeByGenre = async(request, response)=>{
    try {
        const filmesJson = await dbConnect()
        const generoRequest = request.query.genero//
        //não precisa transformar em string
        const filmesFiltrados = filmesJson.filter(filme => filme.genre == generoRequest )
        response.status(200).send(filmesFiltrados)

    } catch (error) {
        response.status(500).json({message: error.message})
    }


}







//exportar as funções do controller
module.exports ={
    getAll,
    getById,
    updateGenerico,
    getFilmeByGenre,
    cadastraFilme
}