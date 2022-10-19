const dbConfig = require("../models/dbConfig")

async function dbConect() {
    return await dbConfig.bancoDeDados("series")
}

const getAll = async (request, response) => {
    try {
        let filmesJson = await dbConect()
        // let filmesJson = await dbConfig.bancoDeDados("filmes")

        response.status(200).send(seriesJson)

    } catch (error) {
        Response.status(500).json({message: error.message})

    }
}
module.exports = {
    getAll
}