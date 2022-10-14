// SERIES
[GET] "/series" 
    *Retorna todas as series

[GET] "/series/pesquisar/:id" 
    *Retorna uma serie encontrada pelo ID 
    *Retorna erro 500 com a mensagem "ID não encontrado"

[GET] "/series/pesquisar" 
    *Retorna uma serie encontrada pelo título 
    *Retorna erro 500 com a mensagem "Serie não encontrada"

[GET] "/series/buscar"
    *Retorna serie encontrada pelo gênero
    *Retorna um erro 500 com a mensagem "Gênero não encontrado"

[POST] "/series/cadastar" 
    *Cadastra uma nova série

[PATCH] "series/atualizar/titulo/:id"
    *Atualiza o titulo da serie
    *Retorna um erro 500 com a mensagem ""Serie não encontrada"

[PUT] "series/substituir/:id"
    *Substitui os dados da serie pelo conteúdo informado no JSON
    *Retorna um erro 500 com a mensagem "Serie não encontrada"

[PUT] "series/update/generico/:id"
    *Atualiza somente a chave informado no JSON
    *Retorna um erro 500 com a mensagem "Serie não encontrada"

// FILMES
[GET] "/filmes" 
    *Retorna todos os filmes

[GET] "/filmes/pesquisar/:id" 
    *Retorna um filme encontrado pelo ID 
    *Retorna erro 500 com a mensagem "ID não encontrado"

[GET] "/filmes/pesquisar" 
    *Retorna um filme encontrado pelo título 
    *Retorna erro 500 com a mensagem "Filme não encontrado"

[GET] "/filmes/buscar"
    *Retorna filme encontrado pelo gênero
    *Retorna um erro 500 com a mensagem "Gênero não encontrado"

[POST] "/filmes/cadastar" 
    *Cadastra um novo filme

[PATCH] "filmes/atualizar/titulo/:id"
    *Atualiza o titulo do filme
    *Retorna um erro 500 com a mensagem ""Filme não encontrado"

[PUT] "filmes/substituir/:id"
    *Substitui os dados do filme pelo conteúdo informado no JSON
    *Retorna um erro 500 com a mensagem "Filme não encontrado"

[PUT] "filmes/update/generico/:id"
    *Atualiza somente a chave informado no JSON
    *Retorna um erro 500 com a mensagem "Filme não encontrado"