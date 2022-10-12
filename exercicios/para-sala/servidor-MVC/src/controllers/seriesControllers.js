const dbConfig = require("../models/dbConfig")

async function dbconnect(){
    return await dbConfig.bancoDeDados("series")
}

const getAll = async(request, response) => {
    try {
        let seriesJson = await dbconnect()
        response.status(200).send(seriesJson)
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

module.exports = {
    getAll
}