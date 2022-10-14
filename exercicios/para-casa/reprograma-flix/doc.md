DOCUMENTAÇÃO

retornar todos os filmes e series
[GET] "/filmes/catalogo"
[GET]"/series/catalogo/busca"

retornar um filme por id
[GET] "/filmes/pesquisar/:id"

atualizar filme por id
retornar erro 404 caso cliente digite id inválido
[PUT] "/filmes/update/generico/:id"

cadastra um novo filme


------------------------
retornar filmes e séries por gênero
[GET] "/series/catalogo/busca"
[GET] "/filmes/catalogo/busca"
