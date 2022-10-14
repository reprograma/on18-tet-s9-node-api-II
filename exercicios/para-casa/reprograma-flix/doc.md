
Rotas Filmes

[GET] - /filmes/catalogo
    * Retorna todos os filmes existentes no banco de dados.

[GET] - /filmes/pesquisa/:id
    * Retorna filmes pelo seu id.

[GET] - /filmes/pesquisa
    * Retorna filmes pelo seu titulo.

[GET] - /filmes/busca?genero=value
    * Retorna filmes pelo seu gênero.

[POST] - /filmes/cadastrar
    * Adiciona/cadastra novo filme ao banco de dados.

[PUT] - /filmes/update/generico/:id
    * Atualiza/modifica qualquer dado de um filme do banco de dados.   

[PATCH] - /filmes/updateTitulo/:id
    * Atualiza/modifica o título dos filmes do banco de dados.

[PUT] - /filmes/updateAll/:id
    * Substitui todos os dados de um determinado filme do banco de dados.


Rotas Séries

[GET] - /series/catalogo
    * Retorna todas as séries existentes no banco de dados.

[GET] - /series/pesquisa/:id
    * Retorna séries pelo seu id.

[GET] - /series/pesquisa
    * Retorna séries pelo seu titulo.

[GET] - /series/busca?genero=value
    * Retorna séries pelo seu gênero.

[POST] - /series/cadastrar
    * Adiciona/cadastra nova séries ao banco de dados.

[PUT] - /series/update/generico/:id
    * Atualiza/modifica qualquer dado de uma série do banco de dados.   

[PATCH] - /series/updateTitulo/:id
    * Atualiza/modifica o título das séries do banco de dados.

[PUT] - /series/updateAll/:id
    * Substitui todos os dados de uma determinada série do banco de dados.

