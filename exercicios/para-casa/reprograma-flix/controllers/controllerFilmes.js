const {response
} = require("../app");
const dbConfig = require("../models/dbConfig")

async function dbConnect() {
  return await dbConfig.bancoDeDados("filmes")
}

const recuperaFilmes = async (_, response) => {
  try {
    const filmes = await dbConnect();
    response.status(200).send(filmes)
  } catch (e) {
    response.status(500).json({
      message: e.message
    })
  }
}

const recuperaFilmePeloId = async (request, response) => {
  try {
    const filmes = await dbConnect();
    const idDoFilme = request.params.id;

    const filmeEncontrado = filmes.find(filme => filme.id == idDoFilme)

    filmeEncontrado == null ?
      response.status(404).send("Filme com esse id não foi encontrado") : response.status(200).send(filmeEncontrado)

  } catch (e) {
    response.status(500).json({
      message: e.message
    })
  }
}

const recuperaFilmePeloTitulo = async (request, response) => {
  try {
    const filmes = await dbConnect();
    const tituloDoFilme = request.query.titulo;

    const filmeEncontrado = filmes.filter(filme => filme.Title.toLowerCase().includes(tituloDoFilme.toLowerCase()));

    filmeEncontrado == null ?
      response.status(404).send("Filme com esse titulo não foi encontrado") :
      response.status(200).send(filmeEncontrado)
  } catch (e) {
    response.status(500).send({
      error: e.message
    });
  }
}

const criarFilme = async (request, response) => {
  try {
    const filmes = await dbConnect();
    const filmeRequest = request.body;

    const novoFilme = {
      id: filmes.length + 1,
      title: filmeRequest.title,
      description: filmeRequest.description
    }
    filmes.push(novoFilme)

    response.status(201).send({
      "Filme novo cadastrado": novoFilme
    })

  } catch (e) {
    response.status(500).json({
      message: e.message
    })
  }
}

const deletarFilme = async (request, response) => {
  try {
    const filmes = await dbConnect();
    const idDoFilme = request.params.id;

    const filme = filmes.find(filme => filme.id == idDoFilme);

    const posicaoFilme = filmes.indexOf(filme);

    filmes.splice(posicaoFilme, 1)

    response.status(200).json({
      "Filme deletado": filme
    })
  } catch (e) {
    response.status(500).send({
      message: e.message
    })
  }
}

const atualizarFilmePeloId = async (request, response) => {
  try {
    const filmes = await dbConnect()
    const idDoFilme = request.params.id
    const bodyRequest = request.body

    const filmeAtualizado = filmes.find(filme => filme.id == idDoFilme)

    const index = filmes.indexOf(filmeAtualizado)

    filmes.splice(index, 1, bodyRequest)
    response.status(200).json({
      "mensagem": "Filme atualizado com sucesso",
      "filmeAtualizado": bodyRequest
    })
  } catch (e) {
    response.status(500).send({
      message: e.message
    })
  }
}

const atualizarTitulo = async (request, response) => {
  try {
    const filmes = await dbConnect()
    const tituloFilme = request.params.Title

    const filmeAtualizado = filmes.find(filme => filme.id == tituloFilme)

    filmeAtualizado.Title = tituloFilme

    response.status(200).json({
      "mensagem": "Titulo atualizado com sucesso",
      "filmeAtualizado": filmeAtualizado
    })
  } catch (e) {
    response.status(500).send({
      message: e.message
    })
  }
}

const atualizarFilmePeloBody = async (request, response) => {
  try {
    const filmes = await dbConnect();
    const idDoFilme = request.params.id;
    const filmeBody = request.body;

    const filmeAtualizado = filmes.find(filme => filme.id == idDoFilme);

    const keys = Object.keys(filmeAtualizado);

    keys.forEach(chave => {
      if (filmeBody[chave] == undefined) {
        filmeAtualizado[chave] = filmeAtualizado[chave]
      } else {
        filmeAtualizado[chave] = filmeBody[chave]
      }
    })

    response.status(200).json({
      "Titulo do filme atualizado": filmeAtualizado
    })
  } catch (e) {
    response.status(500).send({
      message: e.message
    })
  }
}

module.exports = {
  recuperaFilmes,
  recuperaFilmePeloId,
  recuperaFilmePeloTitulo,
  criarFilme,
  deletarFilme,
  atualizarFilmePeloId,
  atualizarTitulo,
  atualizarFilmePeloBody
}
