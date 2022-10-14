dbConfig = require("../models/dbConfig");

async function dbConnect() {
    return await dbConfig.bancoDeDados("series");
}

const getAllSeries = async(request, response) => {
    try {
        const series = await dbConnect();
        return dbConnect.status(200).send(series);
    } catch (error) {
        response.status(500).json({message: error.message});
    }
}

const getSerieById = async(request, response) => {
    try {
        const series = await dbConnect();
        const id = parseInt(request.params.id);
        const serie = series.find( serie => serie.id == id );

        if(!serie) {
            return response.status(404).json({message: "série não encontrada"});
        }

        return dbConnect.status(200).send(serie);
    } catch (error) {
        response.status(500).json({message: error.message});
    }
}

const getSerieByTitle = async(request, response) => {
    try {
        const series = await dbConnect();
        const tituloQuery = request.query.titulo.toLowerCase();
        const serie = series.find( serie => serie.title.toLowerCase().includes(tituloQuery) );

        if(!serie) {
            return response.status(404).json({message: "série não encontrada"});
        }

        return dbConnect.status(200).send(serie);
    } catch (error) {
        response.status(500).json({message: error.message});
    }
}

const getSerieByGenre = async(request, response) => {
    try {
        const series = await dbConnect();
        const generoQuery = request.query.titulo.toLowerCase();
        const seriesArray = series.filter( serie => serie.genre.toLowerCase().includes(generoQuery) );

        if(seriesArray.length == 0) {
            return response.status(404).json({message: "séries não encontradas"});
        }

        return dbConnect.status(200).send(seriesArray);
    } catch (error) {
        response.status(500).json({message: error.message});
    }
}

const postSerie = async(request, response) => {
    try {
        const bodyRequest = request.body
        const series = await dbConnect();

        const novaSerie = {
            id: series.length + 1,
            title: bodyRequest.title,
            description: bodyRequest.description
        }

        series.push(novaSerie);
        return dbConnect.status(201).send({
            mensagem: "Série cadastrado com sucesso",
            novaSerie
        });
    } catch (error) {
        response.status(500).json({message: error.message});
    }
}


const patchTituloSerie = async(request, response) => {
    try {
        const bodyRequest = request.body
        const series = await dbConnect();
        const id = request.params.id;
        const novoTitulo = bodyRequest.Title;

        const serie = series.find( serie => serie.id == id );

        if(!serie) {
            return response.status(404).json({message: "série não encontrada"});
        }

        serie.title = novoTitulo;

        series.push(novoFilme);
        return dbConnect.status(201).send({
            mensagem: "Série atualizada com sucesso",
            serie
        });
    } catch (error) {
        response.status(500).json({message: error.message});
    }
}

const putSerie = async(request, response) => {
    try {
        const bodyRequest = request.body
        const series = await dbConnect();
        const id = request.params.id;

        const serie = series.find( serie => serie.id == id );

        if(!serie) {
            return response.status(404).json({message: "série não encontrada"});
        }

        delete bodyRequest.id;

        const chaves = Object.keys(serie);
        for (const chave of chaves) {
            if( bodyRequest[chave] != undefined ) {
                serie[chave] = bodyRequest[chave];
            }
        }

        series.push(novoFilme);
        return dbConnect.status(201).send({
            mensagem: "Série atualizada com sucesso",
            serie
        });
    } catch (error) {
        response.status(500).json({message: error.message});
    }
}

const patchSerie = async(request, response) => {
    try {
        const bodyRequest = request.body
        const series = await dbConnect();
        const id = request.params.id;

        const serie = series.find( serie => serie.id == id );

        if(!serie) {
            return response.status(404).json({message: "filme não encontrado"});
        }


        delete bodyRequest.id;

        const chaves = Object.keys(serie);
        for (const chave of chaves) {
            if( bodyRequest[chave] != undefined ) {
                serie[chave] = bodyRequest[chave];
            }
        }

        series.push(novoFilme);
        return dbConnect.status(201).send({
            mensagem: "Filme atualizado com sucesso",
            serie
        });
    } catch (error) {
        response.status(500).json({message: error.message});
    }
}

module.exports = {
    getAllSeries,
    getSerieByGenre,
    getSerieById,
    getSerieByTitle,
    postSerie,
    putSerie,
    patchSerie,
    patchTituloSerie
}