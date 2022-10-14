// Invocando o banco de dados no projeto
dbConfig = require("../models/dbConfig");

async function dbConnect() {
    return await dbConfig.bancoDeDados("filmes");
}

const getAll = async(request, response) => {
    try {
        let filmesJson = await dbConnect();
        response.status(200).send(filmesJson);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const getById = async(request, response) => {
    try {
        let filmesJson = await dbConnect();
        let idRequest = request.params.id;

        let encontraFilmePeloId = filmesJson.find((filme) => filme.id == idRequest);

        if (encontraFilmePeloId == undefined)
            throw new Error("filme não encontrado");

        response.status(200).send(encontraFilmePeloId);
    } catch (error) {
        response.status(404).json({ message: error.message });
    }
};

const getByTitle = async(request, response) => {
    try {
        let filmesJson = await dbConnect();
        let tituloRequest = request.query.titulo.toLowerCase();

        let pesquisarTitulo = filmesJson.filter((filme) =>
            filme.Title.toLowerCase().includes(tituloRequest)
        );

        if (pesquisarTitulo.length == 0) throw new Error("Filme não encontrado");

        response.status(200).send(pesquisarTitulo);
    } catch (error) {
        response.status(404).json({ message: error.message });
    }
};

const getByGenre = async(request, response) => {
    try {
        const filmeJson = await dbConnect();
        const generoRequest = request.query.genero;

        const filmeEncontrado = filmeJson.filter((filme) =>
            filme.genre.toString().includes(generoRequest)
        );

        if (filmeEncontrado == undefined) throw new Error("Filme não encontrado.");

        response.status(200).send(filmeEncontrado);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const postByFilme = async(request, response) => {
    let bodyRequest = request.body;
    let filmesJson = await dbConnect();

    let filmes = filmesJson;

    console.log(filmes.length);

    let novoFilme = {
        id: filmes.length + 1,
        title: bodyRequest.title,
        description: bodyRequest.description,
    };

    filmes.push(novoFilme);

    response.status(201).send({
        mensagem: "Filme cadastrado com sucesso!",
        novoFilme,
    });
};

const updateGenerico = async(request, response) => {
    try {
        const filmesJson = await dbConnect();

        let idRequest = request.params.id;
        let bodyRequest = request.body;

        const filmeEncontrado = filmesJson.find((filme) => filme.id == idRequest);

        if (filmeEncontrado == undefined) throw new Error("filme não encontrado");

        bodyRequest.id = filmeEncontrado.id;

        let chaves = Object.keys(filmeEncontrado);

        chaves.forEach((chave) => {
            if (bodyRequest[chave] == undefined) {
                filmeEncontrado[chave] = filmeEncontrado[chave];
            } else {
                filmeEncontrado[chave] = bodyRequest[chave];
            }
        });

        response
            .status(200)
            .json({ mensagem: "Filme atualizado com sucesso!", filmeEncontrado });
    } catch (error) {
        response.status(404).json({ message: error.message });
    }
};

const patchEditar = async(request, response) => {
    const filmesJson = await dbConnect();

    let idRequest = request.params.id;
    let novoTitulo = request.body.Title;

    let filmeEncontrado = filmesJson.find((filme) => filme.id == idRequest);

    filmeEncontrado.Title = novoTitulo;

    response.status(200).json({
        mensagem: "titulo atualizado com sucesso",
        "filme-atualizado": filmeEncontrado,
    });
};

module.exports = {
    getAll,
    getById,
    getByTitle,
    getByGenre,
    postByFilme,
    updateGenerico,
    patchEditar,
};