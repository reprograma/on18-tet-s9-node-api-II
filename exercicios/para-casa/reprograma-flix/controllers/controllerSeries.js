const dbConfig = require("../models/dbConfig")

async function dbConnect() {
  return await dbConfig.bancoDeDados("series")
}

const recuperaSeries = async (_, response) => {
  try {
    const series = await dbConnect()
    response.status(200).send(series)

  } catch (e) {
    response.status(500).json({
      message: e.message
    })
  }
}

const recuperaSeriePeloId = async (request, response) => {
  try {
    const series = await dbConnect()
    const idDaSerie = request.params.id
    const encontrarPorId = series.find(serie => serie.id == idDaSerie)

    encontrarPorId == undefined ?
    response.status(404).send("Serie não encontrada com o id") : response.status(200).send(encontrarPorId)

  } catch (e) {
    response.status(500).json({
      message: e.message
    })
  }
}

const recuperaSeriePeloTitulo = async (request, response) => {
  try {
    let series = await dbConnect()
    let tituloRequest = request.query.titulo.toLowerCase()
    let encontrarPorTitulo = series.filter(serie => serie.title.toLowerCase().includes(tituloRequest))

    encontrarPorTitulo.length == 0 ?
    response.status(404).send("Serie nao encontrada pelo titulo") : response.status(200).send(encontrarPorTitulo)

  } catch (e) {
    response.status(500).json({
      message: e.message
    })
  }
}

const criarSerie = async (request, response) => {
  let series = await dbConnect()
  let bodyRequest = request.body

  let novaSerie = {
    "id": (series.length) + 1,
    "title": bodyRequest.title,
    "totalSeasons": bodyRequest.totalSeasons,
    "genre": bodyRequest.genre,
    "writers": bodyRequest.writer,
    "poster": bodyRequest.poster,
    "actors": bodyRequest.actors,
    "ratings": bodyRequest.ratings
  }

  series.push(novaSerie)

  response.status(200).send({mensagem: "serie cadastrada com sucesso", novaSerie})
}

const deletarSerie = async(request, response) => {
  try {
    const series = await dbConnect();
    const idDaSerie = request.params.id;

    const serie = series.find(serie => serie.id == idDaSerie);

    const posicaoSerie = series.indexOf(serie);

    series.splice(posicaoSerie, 1)

    response.status(200).json({
      "Serie deletada": serie
    })
  } catch (e) {
    response.status(500).send({
      message: e.message
    })
  }
}

const atualizarSeriePeloId = async (request, response) => {
  const series = await dbConnect()
  const idDaSerie = request.params.id
  const bodyRequest = request.body

  const serieAtualizada = series.find(serie => serie.id == idDaSerie)

  const indice = series.indexOf(serieAtualizada)

  series.splice(indice, 1, bodyRequest)
  response.status(200).json({
    "mensagem": "Serie atualizada com sucesso",
    "serieAtualizada": bodyRequest
  })
}

const atualizarTitulo = async (request, response) => {
  const series = await dbConnect()

  const novoTitulo = request.body.title
  const idDaSerie = request.params.id

  const serieAtualizada = series.find(serie => serie.id == idDaSerie)

  serieAtualizada.title = novoTitulo

  response.status(200).json({
    "mensagem": "titulo atualizado com sucesso",
    "serieAtualizada": serieAtualizada
  })
}

const atualizarSeriePeloBody = async(request, response) => {
  try {
    const series = await dbConnect();
    const idDaSerie = request.params.id;
    const serieBodyRequest = request.body;

    const serieAtualizada = series.find(filme => filme.id == idDaSerie);

    const keys = Object.keys(serieAtualizada);

    keys.forEach(chave => {
      if (serieBodyRequest[chave] == undefined) {
        serieAtualizada[chave] = serieAtualizada[chave]
      } else {
        serieAtualizada[chave] = serieBodyRequest[chave]
      }
    })

    response.status(200).json({
      "Titulo do filme atualizado": serieAtualizada
    })
  } catch (e) {
    response.status(500).send({
      message: e.message
    })
  }
}


module.exports = {
  recuperaSeries,
  recuperaSeriePeloId,
  recuperaSeriePeloTitulo,
  criarSerie,
  deletarSerie,
  atualizarSeriePeloId,
  atualizarTitulo,
  atualizarSeriePeloBody
}
