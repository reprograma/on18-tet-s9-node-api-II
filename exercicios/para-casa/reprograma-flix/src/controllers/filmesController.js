const dbConfig = require("../models/dbConfig");

async function dbConnect() {
  return await dbConfig.bancoDeDados("filmes");
}

const get = async (request, response) => {
  try {
    let filmesJson = await dbConnect();
    let query;
    if (request.query.id) {
      query = filmesJson.find((filme) => (filme.id = request.query.id));
    } else if (request.query.titulo) {
      let titulo = request.query.titulo.toLowerCase();
      query = filmesJson.filter((filme) =>
        filme.Title.toLowerCase().includes(titulo)
      );
    } else if (request.query.genero) {
      let genero = request.query.genero.toLowerCase();
      query = filmesJson.filter((filme) =>
        filme.Genre.toString().includes(genero)
      );
    }
    return response.status(200).send(query);
  } catch (error) {
    response.status(500).json({ mensagem: error.message });
  }
};

const post = async (request, response) => {
  try {
    const bodyRequest = request.body;
    const filmesJson = await dbConnect();
    let filmes = filmesJson;

    let novoFilme = {
      id: filmes.length + 1,
      Title: bodyRequest.title,
      Description: bodyRequest.description,
    };

    filmes.push(novoFilme);
    return response.status(201).send({
      mensagem: "Filme cadastrado",
      novoFilme,
    });
  } catch (error) {
    response.status(500).json({ mensagem: error.message });
  }
};

const patch = async (request, response) => {
  try {
    const filmesJson = await dbConnect();
    let filmes = filmesJson;

    const id = request.body.id;

    const filme = filmesJson.find((filme) => filme.id == id);

    if (filme === undefined) throw new Error("Filme não encontrado");

    if (request.body.title) {
      filme.Title = request.body.title;
    }
    if (request.body.description) {
      filme.Description = request.body.description;
    }

    const indice = filmesJson.find((filme) => filme.id == id);

    filmes.splice(indice, 1, filme);

    response.status(200).json({
      mensagem: "Filme atualizado",
      filme,
    });
  } catch (error) {
    response.status(500).json({ mensagem: error.message });
  }
};

const put = async (request, response) => {
  try {
    const filmesJson = await dbConnect();
    let filmes = filmesJson;

    let id = request.body.id;
    let bodyRequest = request.body;

    const filme = filmesJson.find((filme) => filme.id == id);

    if (filme === undefined) throw new Error("Filme não encontrado");
    let chaves = Object.keys(filmeEncontrado);

    chaves.forEach((chave) => {
      if (chave != "id") {
        if (bodyRequest[chave] == undefined) {
          throw new Error(`Chave: ${chave} - Não encontrada`);
        } else {
          filme[chave] = bodyRequest[chave];
        }
      }
    });

    const indice = filmesJson.find((filme) => filme.id == id);

    filmes.splice(indice, 1, filme);

    response.status(200).json({ mensagem: "Filme atualizado.", filme });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = {
  get,
  post,
  patch,
  put,
};
