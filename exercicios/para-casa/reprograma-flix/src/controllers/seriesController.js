
const dbConfig = require("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("series")
}

const getAll = async(request, response)=>{
    try {
        let seriesJson = await dbConnect()
        response.status(200).send(seriesJson)
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

//get por query params
const getByGenero = async(request, response)=>{
    try {
        const seriesJson = await dbConnect()
        const generoRequest = request.query.genero

        const seriesFiltradas = seriesJson.filter(filme => filme.genre.toString().includes(generoRequest))

        response.status(200).send(seriesFiltradas)

    } catch (error) {
        response.status(500).json({message: error.message})
    }
}
// get por serie id
const getById = async (request, response)=>{
    try{
        let seriesJson = await dbConnect()
        let idRequest = request.params.id

        let encontraFilmePorId = seriesJson.find(serie => serie.id == idRequest)

         if (encontraSeriePorId == undefined) throw new Error("Serie não encontrada.")

         response.status(200).send(encontraFilmePorId)

    } catch (error){
        response.status(404).json({message: error.message})

    }
        
    }

    //[get] Por titulo
    const getByTitulo = async (request, response)=>{
        try{
            let listaSeries = request.query.titulo.toLowerCase()
            let tituloRequest = request.query.titulo.toLowerCase()

            let encontrarSeriePorTitulo = listaSeries.filter(serie=>serie.title.toLowerCase().includes(tituloRequest))
             
            console.log(encontrarSeriePorTitulo)

            if(encontrarSeriePorTitulo == undefined) throw new Error("Serie não encontrada.")
             response.status(200).send(encontrarSeriePorTitulo)
        }catch(error){
            response.status(404).json({message:error.message})
        }

        }
    //[post] cadastrar serie
    const postCadastrarSerie = async (request, response)=>{
        let bodyRequest = request.body
        let seriesJson = await dbConnect()
        let series = seriesJson

        console.log(series.length)

        let novaSerie = {
            id:(series.length)+1,
            title: bodyRequest.title,
            description: bodyRequest.description

        }
        series.push(novaSerie)
        response.status(201).send({
            message:"Serie cadastrada!",
            novaSerie
        })
    }

 //[patch]
    const updateTitulo = async (request, response)=>{
        try{
            const seriesJson = await dbConnect()
            
            let idRequest = request.params.id
            let novoTitulo = request.body.title

            const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

            serieEncontrada.title = novoTitulo
             
            response.status(200).json({
                "mensagem": "Titulo atualizado com sucesso!",
                "titulo-atualizado": serieEncontrada

            })
        }catch(error){
            response.status(500).json({message: error.message})
            
            

            
                }
    }

    //[put] substuir

    const updateCompleto = async (request, response)=>{
        const seriesJson = await dbConnect()

        let bodyRequest = request.body
        let idRequest = request.params.id

        const serieEncontradaPorId = seriesJson.find(serie => serie.id == idRequest)

        const indiceDaSerieEncontradaPorId = seriesJson.indexOf(serieEncontradaPorId)

        let serieSubistituta = {
            id : (idRequest),
            title: bodyRequest.title,
            description: bodyRequest.description
        }

        seriesJson.splice(indiceDaSerieEncontradaPorId, 1 ,serieSubistituta)
        response.status(200).json({
            "mensagem": "serie atualizada com sucesso!", serieSubistituta
        })

    }
    
    //[put] qualquer atualização
    const updateGenerico = async (request, response)=>{
        try{
            const seriesJson = await dbConnect()
            
            let idRequest = request.params.id
            let bodyRequest = request.body

            const serieEncontrada = seriesJson.find(serie.id == idRequest)
            if(serieEncontrada  == undefined) throw new Error("Serie não encontrada.")

            bodyRequest.id = serieEncontrada.id

            let chaves = Object.keys(serieEncontrada)
            chaves.forEach((chave)=>{
                if(bodyRequest[chave] == undefined){
                    serieEncontrada[chave] == serieEncontrada[chave]
                }else{
                    serieEncontrada[chave] = bodyRequest[chave]

                }
                
            })
        
    response.status(200).json({"messagem": "Serie atualizada.", serieEncontrada})
        }catch(error){
            response.status(404).json({message: error.message})
        }
    }

    
module.exports = {
    getAll,
    getByGenero,
    getById,
    getByTitulo,
    postCadastrarSerie,
    updateTitulo,
    updateCompleto,
    updateGenerico

   
}