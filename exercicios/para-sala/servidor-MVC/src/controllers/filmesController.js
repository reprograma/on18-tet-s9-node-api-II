
const dbConfig = require("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("filmes")
}
//função getAll retornar todos os filmes
const getAll = async(request, response) => {
    try{
        let filmeJson = await dbConnect()
        //let filmesJson =  await dbConfig.bancoDeDados("filmes")
        
        response.status(200).send(filmesJson)

    } catch (error) {
        response.status(500).json({message: error.message})

    }
}

const getById = async(request, response)=>{
    try {
        let filmesJson =  await dbConfig.bancoDeDados("filmes")
        let idRequest = request.params.id

        let encontraFilmePeloId = filmesJson.find(filme => filme.id == idRequest)

        if(encontraFilmePeloId == undefined)throw new Error("filme não encontrado")

        response.status(200).send(encontraFilmePeloId)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

//Put que vai aceitar qualquer atualização
const updateGenerico = async (request, response)=> {
    try {
        const filmesJson = await dbConnect()
        
        let idRequest = request.params.id
        let bodyRequest = request.body

    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    if(filmeEncontrado == undefined) throw new Error("filme não encontrado")

    bodyRequest.id = filmeEncontrado.id

    let chaves = Object.keys(filmeEncontrado)

    //Array.forEach ((item)=> { codigo })
    chaves.forEach((chave)=>{
         
        //se o body da request não tiver uma das chaves 
        if(bodyRequest[chave] == undefined){
            filmeEncontrado[chave] == filmeEncontrado[chave]
        //senão, ou seja, se no body vier uma chave que existe no json

    }else{
        filmeEncontrado[chave] = bodyRequest[chave]
    }
    })

    response.status(200).json({"mensagem": "filme atualizado", filmeEncontrado})

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

//exportar as funções do controller
module.exports = {
    getAll,
    getById
}
