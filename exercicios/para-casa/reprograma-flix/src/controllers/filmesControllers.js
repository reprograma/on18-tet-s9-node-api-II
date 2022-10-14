const nodemon = require("nodemon")

const dbConfig = require("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("filmes")
}

const getAll = async (request, response)=>{
    try {
        let filmesJson = await dbConnect()
        
        response.status(200).send(filmesJson)


    } catch (error) {
        response.status(500).json({message:error.message})
    }
}

const getById = async (request, response)=>{
    try {

        let filmesJson = await dbConnect()
        let idRequest = request.params.id
        let buscaPorId = filmesJson.find(filme => filme.id == idRequest)

        if (buscaPorId == undefined) throw new Error("Filme não encontrado")

        response.status(200).send(buscaPorId)
        
    } catch (error) {
       response.status(500).json({message:error.message}) 
    }
}

const getByTitle = async (request, response) =>{
    try {
        let filmesJson = await dbConnect()
        let titleRequest = request.query.titulo.toLowerCase()
        let buscaPorTitulo = filmesJson.filter(filme => filme.Title.toLowerCase().includes(titleRequest))

        if(buscaPorTitulo.length == 0) throw new Error("Filme não encontrado")

        response.status(200).send(buscaPorTitulo)
    } catch (error) {

        response.status(500).json({message:error.message})
    }
}

const getByGenre = async(request, response)=>{
    try {
        let filmesJson = await dbConnect()
        let generoRequest = request.query.genero.toLowerCase()
        let seriesPorGenero = filmesJson.filter(filme => filme.Genre.toLowerCase().includes(generoRequest))

        response.status(200).send(seriesPorGenero)

    } catch (error) {
        response.status(500).json({message:error.message})
    } 
    
}

const addFilmes = async (request, response)=>{
    try {
        
        let filmesJson = await dbConnect()
        let bodyRequest = request.body

        let novoFilme = {
            id:(filmesJson.length)+1,
            Title: bodyRequest.title,
            Year:bodyRequest.Year ,
            Runtime:bodyRequest.Runtime,
            Genre:bodyRequest.Genre,
            Director:bodyRequest.Director,
        }

        filmesJson.push(novoFilme)

        response.status(201).send({
            mensagem: "filme cadastrado com sucesso",
            data: novoFilme
        })

    }  catch (error) {
        response.status(500).json({message: error.message})
    }
}

const updateGenerico = async (request, response)=>{
    try {
       const filmesJson = await dbConnect() 
       let idRequest = request.params.id
       let bodyRequest = request.body

    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    
    if(filmeEncontrado == undefined) throw new Error("filme não encontrado")
    
    //essa linha garante que o id do body seja sempre igual ao do filme catalogado.
    bodyRequest.id = filmeEncontrado.id    

    let chaves = Object.keys(filmeEncontrado)
    console.log(chaves)
    //ARRAY.forEach((chave)=>{codigo})
    chaves.forEach(chave=>{
        console.log(chave)
        //Se o body da request não tiver um das chaves
        if(bodyRequest[chave] == undefined){
            filmeEncontrado[chave] == filmeEncontrado[chave]
        //se no body vier uma chave que existe no json
        }else{
            filmeEncontrado[chave] = bodyRequest[chave]
        }
                
    })
    
    response.status(200).json({"mensagem":"filme atualizado", filmeEncontrado})

    } catch (error) {
        response.status(404).json({message:error.message})
    }
}

const updateTitle = async (request, response)=>{
    try {
        const filmesJson = await dbConnect()
        const idRequest = request.params.id
        const novoTitulo = request.body.Title
    
        const filmeEncontrado = filmesJson.find(filme=>filme.id == idRequest)
        
        if (filmeEncontrado == undefined) throw new Error("filme não encontrado")
        
        novoTitulo.id = filmeEncontrado.id 
    
        filmeEncontrado.Title = novoTitulo
    
        response.status(200).json({
            "mensagem":"título atualizado com sucesso",
            "filme-atualizado": filmeEncontrado
        }) 
    } catch (error) {
        response.status(404).json({message:error.message})
    }
}

const updateAll = async(request, response)=>{
    try {

        const filmesJson = await dbConnect()
        const idRequest = request.params.id
        const bodyRequest = request.body

        const filmeEncontrado = filmesJson.find(filme=>filme.id == idRequest)

        if(filmeEncontrado == undefined) throw new Error("filme não encontrado")

        const indice = filmesJson.indexOf(filmeEncontrado)

        console.log(indice)

        filmesJson.splice(indice, 1, bodyRequest)

        response.status(200).json({
        "mensagem": "filme atualizado com sucesso",
        "filme-atualizado": bodyRequest
    })   

    } catch (error) {
        response.status(404).json({message:error.message})
    }  
}

module.exports = {
    getAll,
    getById,
    getByTitle,
    getByGenre,
    addFilmes,
    updateGenerico,
    updateTitle,
    updateAll
}