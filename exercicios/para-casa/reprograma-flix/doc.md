//FILMES
- [GET] "/filmes/catalogo"
    - 200: sucesso para a pesquisa pela lista de filmes
    - 500: erro 

- [GET] "/filmes/pesquisar"
    - 200: sucesso para o titulo pesquisado
    - 404: erro para titulo não encontrado

- [GET] "/filmes/pesquisar/:id"
    - 200: sucesso para o id pesquisado
    - 404: erro para id não encontrado

- [GET] "/filmes/buscar"
    - 200: sucesso para o gênero pesquisado
    - 404: erro para gênero não encontrado

- [POST] "/filmes/cadastrar"
    - 200: sucesso para o cadastro de um novo filme
    - 500: erro para a falta do campo titulo

- [PUT] "/filmes/modificar/:id"
   - 200: sucesso para mofificação
   - 404: erro; não encontrado

- [PATCH] "/filmes/update/:id"
    - 200: sucesso para atualizar o titulo de um filme

- [PUT] "/filmes/substituir/:id"
   - 200: sucesso para a substituição do filme por completo






// SERIES
- [GET] "/series/catalogo"
    - 200: sucesso para a pesquisa pela lista de series
    - 500: erro

- [GET] "/series/pesquisar"
   - 200: sucesso para o título pesquisado
   - 404: erro para título não encontrado

- [GET] "/series/pesquisar/:id
- 200: sucesso para a pesquisa pelo id
- 404: id não encontrado

- [GET] "/series/buscar"
- 200: sucesso para gênero buscado
- 404: erro para gênero não encontrado

- [POST] "/series/cadastrar"
    - 200: sucesso para o cadastro de uma nova serie
    - 500: erro genérico

- [PUT] "/series/modificar/:id"
   - 200: sucesso para mofificação
   - 404: erro; não encontrado

- [PATCH] "/series/update/:id"
    - 200: sucesso para atualizar o titulo de uma serie

- [PUT]- [PUT] "/series/substituir/:id"
   - 200: sucesso para a substituição de uma serie por completo