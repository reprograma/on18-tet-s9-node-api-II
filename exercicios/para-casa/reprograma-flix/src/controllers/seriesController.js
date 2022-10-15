const dbConfig = require("../models/dbConfig");

async function dbConnect() {
  return await dbConfig.bancoDeDados("series");
}

const get = async (request, response) => {
  try {
    let seriesJson = await dbConnect();
    let query = seriesJson;
    if (request.query.id) {
      query = seriesJson.find((serie) => (serie.id = request.query.id));
    } else if (request.query.titulo) {
      let titulo = request.query.titulo.toLowerCase();
      query = seriesJson.filter((serie) =>
        serie.Title.toLowerCase().includes(titulo)
      );
    } else if (request.query.genero) {
      let genero = request.query.genero.toLowerCase();
      query = seriesJson.filter((serie) =>
        serie.Genre.toString().includes(genero)
      );
    }
    response.status(200).send(query);
  } catch (error) {
    response.status(500).json({ mensagem: error.message });
  }
};

const post = async (request, response) => {
  try {
    const bodyRequest = request.body;
    const seriesJson = await dbConnect();
    let series = seriesJson;

    let novoserie = {
      id: series.length + 1,
      title: bodyRequest.title,
      description: bodyRequest.description,
    };

    series.push(novoserie);
    response.status(201).send({
      mensagem: "serie cadastrada",
      novoserie,
    });
  } catch (error) {
    response.status(500).json({ mensagem: error.message });
  }
};

const patch = async (request, response) => {
  try {
    const seriesJson = await dbConnect();
    let series = seriesJson;

    const id = request.body.id;

    const serie = seriesJson.find((serie) => serie.id == id);

    if (serie === undefined) throw new Error("serie não encontrada");

    if (request.body.title) {
      serie.title = request.body.title;
    }
    if (request.body.description) {
      serie.description = request.body.description;
    }

    const indice = seriesJson.find((serie) => serie.id == id);

    series.splice(indice, 1, serie);

    response.status(200).json({
      mensagem: "serie atualizada",
      serie,
    });
  } catch (error) {
    response.status(500).json({ mensagem: error.message });
  }
};

const put = async (request, response) => {
  try {
    const seriesJson = await dbConnect();
    let series = seriesJson;

    let id = request.body.id;
    let bodyRequest = request.body;

    const serie = seriesJson.find((serie) => serie.id == id);

    if (serie === undefined) throw new Error("serie não encontrada");
    let chaves = Object.keys(serieEncontrado);

    chaves.forEach((chave) => {
      if (chave != "id") {
        if (bodyRequest[chave] == undefined) {
          throw new Error(`Chave: ${chave} - Não encontrada`);
        } else {
          serie[chave] = bodyRequest[chave];
        }
      }
    });

    const indice = seriesJson.find((serie) => serie.id == id);

    series.splice(indice, 1, serie);

    response.status(200).json({ mensagem: "serie atualizada.", serie });
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
