const { response } = require("express")
const { request } = require("../app")
const dbConfig = require("../models/dbConfig")

async function bdConnect() {
    return await dbConfig.bancoDeDados("filmes")
}


const getAll = async(request, response) =>{
    try {
        let bdFilme = await bdConnect()
        response.status(200).send(bdFilme)

    } catch (error) {
        response.status(500).json({mensagem:error.mensagem})
        
    }
}

const getById = async(request, response) =>{
    try {
        let filmeId = await bdConnect()
        let idRequest = request.params.id

        let idEncontrado = filmeId.find(filme => filme.id == idRequest)

        
        if( idEncontrado == undefined) throw new Error("Filme não encontrado!")

        response.status(200).send(idEncontrado)


    } catch (error) {
        response.status(404).json({message: error.message})
        
    }
}

 
const getTitle = async(request, response) =>{
    try {
        let filmeTitle = await bdConnect()
        let titleRequest = request.query.title.toLowerCase()

        let buscarPorTitulo = filmeTitle.filter(filme => filme.Title.toLowerCase().includes(titleRequest))

        
        if(buscarPorTitulo.length == 0) throw new Error("Filme não encontrado")
    
        response.status(200).send(buscarPorTitulo)

    } catch (error) {
        response.status(404).json({message: error.message})
        
    }
}

const getGenero = async(request, response) =>{
    try {
        let filmeGenero = await bdConnect()
        let generoRequest = request.query.genre.toLowerCase()

        let encontradoPorGenero = filmeGenero.filter(filme =>filme.Genre.toLowerCase().includes(generoRequest))

        if(encontradoPorGenero.length == 0) throw new Error("Filme não encontrado")

        response.status(200).send(encontradoPorGenero)
        
    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

const postCriar = async(request, response) =>{
    try {
        let bodyRequest = request.body
        let criar = await bdConnect()
        let novoFilme = {
            id: bodyRequest,
            title: bodyRequest.Title,
            tenre: bodyRequest.Genre,
            description: bodyRequest.description
        }

        criar.push(novoFilme)
        response.status(201).send({
            mensagem: "filme cadastrado com sucesso",
            data: novoFilme
        })

    } catch (error) {
        response.status(500).json({message: error.message})
        
    }
}


const deLete = async(request, response)=>{
    try {
        let deletarFilme = await bdConnect()
    let deLeteRequeste = request.params.id
    let encontraFilmes = deletarFilme.filme
    
    const filmesEncontrado = deletarFilme.find(filme => filme.id == deLeteRequeste)

     console.log(filmesEncontrado)

    const indice = deletarFilme.indexOf(filmesEncontrado)

    deletarFilme.splice(indice, 1)

    response.status(410).json({
        "mensagem": "filme foi deletado com sucesso",
        "filme-deletado": filmesEncontrado
    })

    } catch (error) {
        response.status(500).json({message: error.message})
                
    }

   
}


const paTC = async(request, response) =>{
    try {
       let filmesBancoDados = await bdConnect()
       let filmeJs = filmesBancoDados.filme

       let filmeRequest = request.params.id
       let tituloNovo = request.body.Title

       let filmeEncontrado = filmesBancoDados.find(filme => filme.id == filmeRequest) 

       filmeEncontrado.Title = tituloNovo

    response.status(200).json({
        "mensagem": "titulo atualizado com sucesso",
        "filme-atualizado": filmeEncontrado
    })

    } catch (error) {

        response.status(500).json({message: error.message}) 
    }


}

//substituir tudo de um filme
const PtAll = async(request, response)=>{
    try {
        const filmesJS = await bdConnect()
    let filmeSub = filmesJS.filme 

    let idRequest = request.params.id
    let bodyRequest = request.body

    let encontrarFilme = filmeSub.find( filme => filme.id == idRequest)

    const indice = filmeSub.indexOf(encontrarFilme)

    filmeSub.splice(indice, 1, bodyRequest)
    
    response.status(200).json({
        "mensagem": "titulo atualizado com sucesso",
        "filme-atualizado": encontrarFilme
    })
    } catch (error) {
        response.status(500).json({message: error.message}) 
    }

}


const upDAT = async(request, response) =>{
    try {
        const filmeJs = await bdConnect()

        let idRequest = request.params.id
        let bodyRequest = request.body

    const encontraFilme = filmeJs.find(filme => filme.id == idRequest)

    if(encontraFilme.length == 0) throw new Error("Filme não encontrado")

    bodyRequest.id == encontraFilme.id

    let chaves = Object.keys(encontraFilme)

    chaves.forEach((chave)=> {
     
        if(bodyRequest[chave] == undefined){

            encontraFilme[chave] = encontraFilme[chave]
         }else{
            encontraFilme[chave] = bodyRequest[chave]
         }
    })

   response.status(200).json({
        "mensagem": "filme atualizado", encontraFilme
    })
   

    } catch (error) {
        response.status(500).json({message: error.message})
        
    }

}




module.exports = {

    getAll,
    getById,
    getTitle,
    getGenero,
    postCriar,
    deLete,
    paTC,
    upDAT,
    PtAll 
}