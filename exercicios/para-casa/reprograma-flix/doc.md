Para os filmes:

[GET] "/catalogo"
200: retornar todos os filmes
500: algo errado aconteceu

[GET] "/filmes/pesquisar/:id"
parametro: id
200: retorna o filme com id selecionado
404: filme não existe

[GET] "/filmes/pesquisar?titulo "
query: titulo = " "
200: retorna o filme com nome selecionado
404: filme não existe

[GET] "/filmes/catalogo/busca"
query: genero = " "
200: retorna o filme selecionado por genero
404: dados incorretos

[POST]"/filmes/cadastrar"

201: cadastra um novo filme
500: algo errado aconteceu

[PATCH]"/filmes/updatetitulo/:id"
200: retorna filme com o título atualizado
404: filme não encontrado

[PUT]"/filmes/updatefilme/:id"
200: retorna filme com dados substituídos
404: filme não encontrado

[PUT]"/filmes/update-generico/:id"
200: retorna filme com a atualização
404: filme não encontrado

Para as séries

[GET] "/catalogo"
200: retornar todas as séries
500: algo errado aconteceu

[GET] "/series/pesquisar/:id"
parametro: id
200: retorna a série com id selecionado
404: série não existe

[GET] "/series/pesquisar?titulo "
query: titulo = " "
200: retorna a série com nome selecionado
404: série não existe

[GET] "/series/catalogo/busca"
query: genero = " "
200: retorna a série selecionada por genero
404: dados incorretos

[POST]"/series/cadastrar"

201: cadastra uma nova serie
500: algo errado aconteceu

[PATCH]"/series/updatetitulo/:id"
200: retorna série com o título atualizado
404: série não encontrada

[PUT]"/series/updateserie/:id"
200: retorna série com dados substituídos
404: série não encontrada

[PUT]"/series/update-generico/:id"
200: retorna série com a atualização
404: série não encontrada