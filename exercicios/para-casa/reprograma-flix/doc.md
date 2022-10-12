#documentação das rotas

[x] - [GET] Quero uma rota que venha todos os filmes
"/filmes"
- 200: Retorna todos os filmes
- 500: Retorna caso aconteça algum erro

[ ] - [GET] Quero uma rota que venha todas as series 
"/series"
- 200: Retorna todos os filmes
- 500: Retorna caso aconteça algum erro
----------------------------------------------------
[x] - [GET] Rota que vem filmes filtrados por título
"/filmes/pesquisar?titulo"
- 200: Retorna filmes por título
- 404: Retorna caso aconteça algum erro

[] - [GET] Rota que vem as séries filtradas por título
"/series/pesquisar?titulo"
- 200: Retorna series por título
- 404: Retorna caso aconteça algum erro
-----------------------------------------------
[x] - [GET] Rota que vem os filmes por id
"/filmes/pesquisar/:id"
- 200: Retorna series por id
- 404: Retorna caso aconteça algum erro

[ ] - [GET] Rota que vem as séries por id
"/series/pesquisar/:id"
- 200: Retorna series por título
- 404: Retorna caso aconteça algum erro
---------------------------------------------------
[x] - [GET] Rota que vem os filmes por genero
"/filmes/pesquisar/genero"
- 200: Retorna filme por genero
- 404: Retorna caso aconteça algum erro

[ ] - [GET] Rota que vem os filmes por genero
"/series/pesquisar/genero"
- 200: Retorna series por genero
- 404: Retorna caso aconteça algum erro
----------------------------------------------------
[x] - [POST] Rota para cadastro de um novo filme
"/filmes/cadastrar"
- 200: Retorna novo filme cadastrado
- 404: Retorna caso aconteça algum erro

[ ] - [POST] Rota para cadastro de uma nova serie
"/series/cadastrar"
- 200: Retorna nova serie cadastrado
- 404: Retorna caso aconteça algum erro
----------------------------------------------------
[ ] - [PATCH] Rota para editar um dos itens(título)
"/filmes/updatetitulo/:id"
- 200: Retorna filme editado
- 404: Retorna caso aconteça algum erro

[ ] - [PATCH] Rota para editar um dos itens(título)
"/series/updatetitulo/:id"
- 200: Retorna série editada

------------------------------------------------------
[x] - [PUT] Rota para substituir filme por outro(mudatudo)
"/filmes/substituir/:id"
- 200: Retorna filme substituido

[ ] - [PUT] Rota para substituir serie por outra
"/filmes/substituir/:id"
- 200: Retorna serie substituida
-------------------------------------------------------




- [ ] Devo conseguir editar qualquer campo deles
- [ ] Quero casos de erro