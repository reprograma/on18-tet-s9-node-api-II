const dbConfig = require("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("series")   
}

const getAll = async(request,response)=>{
    try {
        const seriesJson = await dbConnect()

        response.status(200).send(seriesJson)

        
    } catch (error) {
       response.status(404).json({message:error.message})
    }
}

const getById = async (request,response)=>{
    try {
        const seriesJson = await dbConnect()
        const idRequest = request.params.id
    
        const serieEncontrada = seriesJson.find(serie=> serie.id == idRequest)
        console.log(serieEncontrada)

        if (serieEncontrada == undefined) throw new Error("Série não encontrada")
        
       
        response.status(200).send(serieEncontrada)

    } catch (error) {
        response.status(404).json({message:error.message})
    }
    
}

const getByTitle = async (request,response)=>{
    try {
        const seriesJson = await dbConnect()
        const titleRequest = request.query.titulo.toLowerCase()

        const buscaPorTitulo = seriesJson.filter(serie => serie.title.toLowerCase().includes(titleRequest))
            console.log(buscaPorTitulo)
        if (buscaPorTitulo.length == 0) throw new Error("Série não encontrada")

        response.status(200).send(buscaPorTitulo)
        
    } catch (error) {
        response.status(404).json({message:error.message})
    }
}

const getByGenre = async (request, response)=>{
    try {
        const seriesJson = await dbConnect()
        const genreRequest = request.query.genero.toLowerCase()
        const seriesEncontradas = seriesJson.filter(serie => serie.genre.toString().toLowerCase().includes(genreRequest))

        if (seriesEncontradas.length == 0) throw new Error("Série não encontrada") 

        response.status(200).send(seriesEncontradas)
    
    } catch (error) {
        response.status(404).json({message:error.message})
    }
    
}

const cadastraSerie = async (request,response)=>{
    try {
        const seriesJson = await dbConnect()
        const bodyRequest = request.body

        let novaSerie = {
            id:seriesJson.length + 1,
            title:bodyRequest.title ,
            totalSeasons:bodyRequest.totalSeasons,
            genre:bodyRequest.genre
        }

        seriesJson.push(novaSerie)

        response.status(200).json("A série foi cadastrada com sucesso")

    } catch (error) {
        response.status(404).json({message:error.message})
    }
}

const updateGenerico = async(request, response)=>{
    try {
        const seriesJson = await dbConnect()
        const idRequest = request.params.id
        const bodyRequest = request.body

        const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

        if(serieEncontrada == undefined) throw new Error("Série não encontrada")

        bodyRequest.id = serieEncontrada.id

        let chaves = Object.keys(serieEncontrada)

        chaves.forEach(chave=>{
            if(bodyRequest[chave] == undefined){
                serieEncontrada[chave] == serieEncontrada[chave]
            
            }else{
                serieEncontrada[chave] = bodyRequest[chave]
            }
        })

        response.status(200).json({
            mensagem:"A série foi atualizada com sucesso",
            dado: serieEncontrada
        })

    } catch (error) {
         response.status(404).json({message:error.message})
    }
}

const updateTitulo = async (request, response)=>{
   try {
        const seriesJson = await dbConnect()
        const idRequest = request.params.id
        const novoTitulo = request.body.title

        const serieEncontrada = seriesJson.find(serie=>serie.id == idRequest)

        if(serieEncontrada == undefined) throw new Error("Série não encontrada")

        novoTitulo.id = serieEncontrada.id

       serieEncontrada.title = novoTitulo

        response.status(200).json({
            mensagem:"O título foi atualizado com sucesso",
            dado:serieEncontrada 
        })
   } catch (error) {
        response.status(404).json({message:error.message})
   }    
}

const updateAll = async (request, response)=>{
    try {
        const seriesJson = await dbConnect()
        const idRequest = request.params.id
        const atualizacaoSerie = request.body

        const serieEncontrada = seriesJson.find(serie=>serie.id == idRequest)

        if (serieEncontrada == undefined) throw new Error("Série não encontrada")

        atualizacaoSerie.id = serieEncontrada.id

        const indiceDaSerieAtualizada = seriesJson.indexOf(serieEncontrada)

        seriesJson.splice(indiceDaSerieAtualizada, 1 , atualizacaoSerie)

        response.status(200).json({
            mensagem: "Série atualizada com sucesso",
            dado: atualizacaoSerie
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
    cadastraSerie,
    updateGenerico,
    updateTitulo,
    updateAll

}