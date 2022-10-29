const dbConfig = require("../models/dbConfig")

async function dbConnect() {
    return await dbConfig.bancoDeDados("filmes")
}

const getAll = async(request, response)=>{
    try {
        let filmesJson = await dbConnect()

        response.status(200).send(filmesJson)
        
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }

}


const getByTitle = async(request, response) => {
    try {
        let filmesJson = await dbConnect()
        let tituloRequest = request.query.titulo

        let encontraPorTitulo = filmesJson.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))

        if(encontraPorTitulo.length == 0) throw new Error("Filme não encontrado")

        response.status(200).send(encontraPorTitulo)

    } catch (error) {
        response.status(404).json({message: error.message})
        
    }

}

const getById = async(request, response) => {
    try {
        let filmesJson = await dbConnect()
        let idRequest = request.params.id

        let encontraPeloId = filmesJson.find(filme => filme.id == idRequest)

        if(encontraPeloId == undefined) throw new Error("Filme não encontrado")

        response.status(200).send(encontraPeloId)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
}


const getByGenre = async(request, response) =>{
    try {
        let filmesJson = await dbConnect()
        let generoRequest = request.query.genero.toLowerCase() 
        
        let encontraPorGenero = filmesJson.filter(filme => filme.Genre.toLowerCase().includes(generoRequest))
        
        if(encontraPorGenero.length == 0) throw new Error("Gênero não encontrado")
        
        response.status(200).send(encontraPorGenero)
    } catch (error) {
        response.status(404).json({message: error.message})
    }
    

}


const postNewFilm = async(request, response) =>{

    try {
        let filmesJson = await dbConnect()
        let bodyRequest = request.body

        let novoFilme = {
        id:(filmesJson.length)+1,
        Title: bodyRequest.title,
        description: bodyRequest.description
    }

    // prof., eu imaginei um caso de erro em que o client não coloca o campo title na requisição, então ele retorna um erro. 

    if(novoFilme.Title == null) throw new Error("Falta o campo title")
    
    filmesJson.push(novoFilme)
    
    response.status(201).send({
        message: "Filme cadastrado com sucesso",
        novoFilme
    })


    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
    
}

// esse put foi feito após rever a aula de revisão do conteúdo
const putUpdateGenerico = async (request, response) =>{

    try {
        const filmesJson = await dbConnect()
        let idRequest = request.params.id
        let bodyRequest = request.body

        let encontraPeloId = filmesJson.find(filme => filme.id == idRequest)

        bodyRequest.id = encontraPeloId.id

        // object.keys retorna uma array
        let chaves = Object.keys(encontraPeloId)

        chaves.forEach((chave) => {
            if(bodyRequest[chave] == undefined) {
                encontraPeloId[chave] = encontraPeloId[chave]
            } else {
                encontraPeloId[chave] = bodyRequest[chave]
            }
        })

        response.status(200).json({"menssagem": "filme atualizado", encontraPeloId })

    } catch (error) {
        response.status(404).json({
            message: error.message
        })
    }

}



const patchTitle = async(request, response) =>{
    let filmesJson = await dbConnect()
    let idRequest = request.params.id

    let novoTitulo = request.body.title

    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    filmeEncontrado.Title = novoTitulo

    response.status(200).json({
        "message": "Titulo atualizado com sucesso",
        "filme-atualizado": filmeEncontrado
    })
}

const putInfo = async(request, response) =>{
    let filmesJson = await dbConnect()
    let idRequest = request.params.id
    let bodyRequest = request.body

    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    const indice = filmesJson.indexOf(filmeEncontrado)

    filmesJson.splice(indice, 1, bodyRequest)

    response.status(200).json({
        "messagem": "filme atualizado com sucesso",
        "filme-atualizado": bodyRequest
    })


}






module.exports = {
    getAll, 
    getByTitle,
    getById,
    getByGenre,
    postNewFilm,
    putUpdateGenerico,
    putInfo,
    patchTitle,
    
}