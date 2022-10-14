dbConfig = require("../models/dbConfig");

async function dbConnect() {
    return await dbConfig.bancoDeDados("filmes");
}

const getAllFilmes = async(request, response) => {
    try {
        const filmes = await dbConnect();
        return response.status(200).send(filmes);
    } catch (error) {
        response.status(500).json({message: error.message});
    }
}

const getFilmeById = async(request, response) => {
    try {
        const filmes = await dbConnect();
        const id = parseInt(request.params.id);
        const filme = filmes.find( filme => filme.id == id );

        if(!filme) {
            return response.status(404).json({message: "filme não encontrado"});
        }

        return response.status(200).send(filme);
    } catch (error) {
        response.status(500).json({message: error.message});
    }
}

const getFilmeByTitle = async(request, response) => {
    try {
        const filmes = await dbConnect();
        const tituloQuery = request.query.titulo.toLowerCase();
        const filme = filmes.find( filme => filme.Title.toLowerCase().includes(tituloQuery) );

        if(!filme) {
            return response.status(404).json({message: "filme não encontrado"});
        }

        return response.status(200).send(filme);
    } catch (error) {
        response.status(500).json({message: error.message});
    }
}

const getFilmeByGenre = async(request, response) => {
    try {
        const filmes = await dbConnect();
        const generoQuery = request.query.genero.toLowerCase();
        const filmesArray = filmes.filter( filme => filme.Genre.toLowerCase().includes(generoQuery) );

        if(filmesArray.length == 0) {
            return response.status(404).json({message: "filmes não encontrados"});
        }

        return response.status(200).send(filmesArray);
    } catch (error) {
        response.status(500).json({message: error.message});
    }
}

const postFilme = async(request, response) => {
    try {
        const bodyRequest = request.body
        const filmes = await dbConnect();

        const novoFilme = {
            id: filmes.length + 1,
            Title: bodyRequest.title,
            Description: bodyRequest.description
        }

        filmes.push(novoFilme);
        return response.status(201).send({
            mensagem: "Filme cadastrado com sucesso",
            novoFilme
        });
    } catch (error) {
        response.status(500).json({message: error.message});
    }
}

const patchTituloFilme = async(request, response) => {
    try {
        const bodyRequest = request.body
        const filmes = await dbConnect();
        const id = request.params.id;
        const novoTitulo = bodyRequest.Title;

        const filme = filmes.find( filme => filme.id == id );

        if(!filme) {
            return response.status(404).json({message: "filme não encontrado"});
        }

        filme.Title = novoTitulo;

        filmes.push(novoFilme);
        return response.status(201).send({
            mensagem: "Filme atualizado com sucesso",
            filme
        });
    } catch (error) {
        response.status(500).json({message: error.message});
    }
}

const putFilme = async(request, response) => {
    try {
        const bodyRequest = request.body
        const filmes = await dbConnect();
        const id = request.params.id;

        const filme = filmes.find( filme => filme.id == id );

        if(!filme) {
            return response.status(404).json({message: "filme não encontrado"});
        }


        delete bodyRequest.id;

        const chaves = Object.keys(filme);
        for (const chave of chaves) {
            if( bodyRequest[chave] != undefined ) {
                filme[chave] = bodyRequest[chave];
            }
        }

        filmes.push(novoFilme);
        return response.status(201).send({
            mensagem: "Filme atualizado com sucesso",
            filme
        });
    } catch (error) {
        response.status(500).json({message: error.message});
    }
}

const patchFilme = async(request, response) => {
    try {
        const bodyRequest = request.body
        const filmes = await dbConnect();
        const id = request.params.id;

        const filme = filmes.find( filme => filme.id == id );

        if(!filme) {
            return response.status(404).json({message: "filme não encontrado"});
        }

        delete bodyRequest.id;

        const chaves = Object.keys(filme);
        for (const chave of chaves) {
            if( bodyRequest[chave] != undefined ) {
                filme[chave] = bodyRequest[chave];
            }
        }

        filmes.push(novoFilme);
        return response.status(201).send({
            mensagem: "Filme atualizado com sucesso",
            filme
        });
    } catch (error) {
        response.status(500).json({message: error.message});
    }
}

module.exports = {
    getAllFilmes,
    getFilmeByGenre,
    getFilmeById,
    getFilmeByTitle,
    postFilme,
    putFilme,
    patchFilme,
    patchTituloFilme
}