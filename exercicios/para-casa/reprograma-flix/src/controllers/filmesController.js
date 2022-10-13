//Puxar o banco de dados
const dbConfig = require("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("filmes")
}

//Criação de conteúdo das rotas
const getAll = async(request,response)=>{
    try{
        let filmesJson = await dbConnect();
        response.status(200).send(filmesJson)
    
    } catch(error){
        response.status(500).json({message: error.message})
    }
}

const buscaId = async(request,response)=>{
    try{
        let filmesJson = await dbConnect();
        let filmeRequest = request.params.id;
        
        let filmeEncontrado = filmesJson.find(filme =>
            filme.id == filmeRequest);

        response.status(200).send(filmeEncontrado)
    
    } catch(error){
        response.status(500).json({message: error.message})
    }
}

const FilmePorNome = async(request,response)=>{
    try{
        let filmesJson = await dbConnect();
        let filmeRequest = request.query.title;

        let filmeEncontrado = filmesJson.filter(filme => 
            filme.Title.toLowerCase().includes(filmeRequest.toLowerCase()))

        response.status(200).send(filmeEncontrado);
    
    } catch(error){
        response.status(500).json({message: error.message})
    }
}

let novoFilme = async(request,response)=>{
    try{
        let filmesJson = await dbConnect();
        let filmeRequest = request.body;

        let novoFilme = {
            id: filmesJson.length + 1,
            title: filmeRequest.title,
            description: filmeRequest.description
        }
        filmesJson.push(novoFilme)

        response.status(201).send({
            "Novo filme":novoFilme
        })
    
    } catch(error){
        response.status(500).json({message: error.message})
    }
}

let deletarFilme = async(request, response)=>{
    let filmesJson = await dbConnect();
    let filmeRequest = request.params.id;
    // let bodyRequest = request.body;

    let filmeEncontrado = filmesJson.find(filme=>
        filme.id == filmeRequest);

    let posicaoFilme = filmesJson.indexOf(filmeEncontrado);

    filmesJson.splice(posicaoFilme, 1)

    response.status(200).json({
        "Filme deletado": filmeEncontrado
    })
}

//Atualizar um filme por inteiro usando PUT
let fazerPut = async(request, response)=>{
    let filmesJson = await dbConnect();
    let filmeRequest = request.params.id;
    let filmeBody = request.body;

    let filmeEncontrado = filmesJson.find(filme=>
        filme.id==filmeRequest);

    if(filmeEncontrado==undefined) throw new Error("filme não encontrado");
    
    filmeBody.id = filmeEncontrado.id;

/*  Agora, ao invés de pegar o index de um inteiro, nós vamos pegar chave por chave
    let posicaoFilme = filmesJson.indexOf(filmeEncontrado)

    filmesJson.splice(posicaoFilme,1,filmeBody)
*/
    let chaves = Object.keys(filmeEncontrado)

    chaves.forEach((chave)=>{
        if(filmeBody[chave] == undefined){
            filmeEncontrado[chave] = filmeEncontrado[chave]
        }else{
            filmeEncontrado[chave] = filmeBody[chave]
        }
    })

    response.status(200).json({
        "filme Atualizado": filmeEncontrado
    })
}

let atualizarTitulo = async(request,response)=>{
    //Banco de dados, params, body
    //Encontrar item no banco de dados, substituir

    let filmesJson = await dbConnect();
    let filmeRequest = request.params.id;
    let filmeBody = request.body;

    let filmeEncontrado = filmesJson.find(filme=>
        filme.id == filmeRequest);
    
    filmeEncontrado.Title = filmeBody.Title

    response.status(200).json({
        "Título alterado": filmeEncontrado
    })
}

let atualizarTudo = async(request,response)=>{

    let filmesJson = await dbConnect();
    let filmeRequest = request.params.id;
    let filmeBody = request.body;

    let filmeEncontrado = filmesJson.find(filme=>
        filme.id == filmeRequest);
    
    let chaves = Object.keys(filmeEncontrado);

    chaves.forEach((chave)=>{
        if (filmeBody[chave] == undefined){
            filmeEncontrado[chave] = filmeEncontrado[chave]
        }else{
            filmeEncontrado[chave] = filmeBody[chave]
        }
    })

    response.status(200).json({
        "Título alterado": filmeEncontrado
    })
}

//Exportar
module.exports = {
    getAll,
    buscaId,
    FilmePorNome,
    novoFilme,
    deletarFilme,
    fazerPut,
    atualizarTitulo,
    atualizarTudo
}