 [GET] "/filmes"
    * Retornar todos os filmes
- [GET] "/filmes/:id/pequisabyId"
    * Pesquisa um filme por id 
    * Retorna erro 404 caso não haja filme com o id pesquisado
    * Retorna erro 500 caso haja um erro inesperado
- [GET] "/filmes/pesquisaPorTitulo?titulo=abc"
    * Retorna filme por título
    * Retorna erro 404 caso não haja filme com o título pesquisado
    * Retorna erro 500 caso haja um erro inesperado
- [GET] "/filmes/pesquisaPorGenero?genero=abc"
    * Retorna filme por genero
    * Retorna erro 404 caso não haja filme com o gênero pesquisado
    * Retorna erro 500 caso haja um erro inesperado
- [POST] "/filmes/cadastrar"
    * Cadastra um novo filme 
    * Retorna erro 500 caso haja um erro inesperado
- [PUT]/filmes/:id/update
    * Atualiza um filme por inteiro
    * Retorna erro 404 caso não haja filme com o id pesquisado
    * Retorna erro 500 caso haja um erro inesperado
- [PATCH]/filmes/:id/editarTitulo
    * Atualiza apenas o titulo
    * Retorna erro 404 caso não haja filme com o id pesquisado
    * Retorna erro 500 caso haja um erro inesperado
- [PATCH]/filmes/:id/editar
    * Atualiza apenas o titulo
    * Retorna erro 404 caso não haja filme com o id pesquisado
    * Retorna erro 500 caso haja um erro inesperado


[GET] "/series"
    * Retornar todas as séries
- [GET] "series/:id/pequisabyId"
    * Pesquisa uma série por id 
    * Retorna erro 404 caso não haja série com o id pesquisado
    * Retorna erro 500 caso haja um erro inesperado
- [GET] "series/pesquisaPorTitulo?titulo=abc"
    * Retorna série por título
    * Retorna erro 404 caso não haja série com o título pesquisado
    * Retorna erro 500 caso haja um erro inesperado
- [GET] "/series/pesquisaPorGenero?genero=abc"
    * Retorna séries por gênero
    * Retorna erro 404 caso não haja série com o gênero pesquisado
    * Retorna erro 500 caso haja um erro inesperado
- [POST] "/series/cadastrar"
    * Cadastra uma nova série
    * Retorna erro 500 caso haja um erro inesperado
- [PUT]/series/:id/update
    * Atualiza uma série por inteiro
    * Retorna erro 404 caso não haja série com o id pesquisado
    * Retorna erro 500 caso haja um erro inesperado
- [PATCH]/series/:id/editarTitulo
    * Atualiza apenas o titulo
    * Retorna erro 404 caso não haja série com o id pesquisado
    * Retorna erro 500 caso haja um erro inesperado
- [PATCH]/series/:id/editar
    * Atualiza apenas o titulo
    * Retorna erro 404 caso não haja série com o id pesquisado
    * Retorna erro 500 caso haja um erro inesperado