const dbConfig = require("../models/dbConfig")

const getAll = async(req, res)=>{
    try {
        const seriesJson = await dbConfig.bancoDeDados("series")
        console.log(seriesJson)
        res.status(200).send(seriesJson)
    } catch (error) {
        response.status(500).json({message: error.message})
        
    }
   
}

const getByGender = (req, res)=>{
    const generoRequest = req.query.genero

    const seriesFiltradas = seriesJson.filter( serie =>
        serie.genre.toString().includes(generoRequest)
    )

    res.status(200).send(seriesFiltradas)

}



module.exports ={
    getAll,
    getByGender
}