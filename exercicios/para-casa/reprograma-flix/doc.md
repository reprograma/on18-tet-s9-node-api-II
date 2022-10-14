#Documentação da API


- [x] Quero uma rota que venha todos os filmes e series
duas rotas a /filmes e a /series

* [GET] /filmes

  -200: Retorna todos os filmes
  -404: Comando não encontrado

* [GET] /series

  -200: Retorna todos as series
  -404: Comando não encontrado


- [x] /filmes deve retornar todos os filmes

* [GET] /filmes/catalogo
  -200: Retorna todos os filmes
  -404: Comando não encontrado

- [x] /series deve retornar todos as series

* [GET] /series/catalogo
  -200: Retorna todas as series
  -404: Comando não encontrado

- [x] Devo conseguir filtrar por titulo, id e genero

* [GET] /filmes/catalogo/:id
* [GET] /series/catalogo/:id

  -200: Retorna filme/serie encontrado(a)
  -404: Comando não encontrado

* [GET] /filmes/catalogo (com query params para título e gênero)
* [GET] /series/catalogo(com query params para título e gênero)

  -200: Retorna filme/serie encontrado(a)
  -404: Comando não encontrado

- [x] Devo conseguir cadastrar filmes e series
*[POST] /cadastrar (mesma sub-rota para filmes e series)

-201: Item criado

- [x] Devo conseguir editar o nome de qualquer um deles
* [PATCH] /editar/:id (mesma sub-rota para filmes e series)

  -200: Retorna o/a filme/serie cadastrado(a)
  -404: Comando não encontrado


- [x] Devo conseguir substituir tudo de um filme ou serie
* [PUT] /atualizacao/:id (mesma sub-rota para filmes e series)

  -200: Retorna o/a filme/serie substituído(a)
  -404: Comando não encontrado


- [x] Devo conseguir editar qualquer campo deles
* [PATCH] /update/:id (mesma sub-rota para filmes e series)

  -200: Retorna o/a filme/serie com o ajuste
  -404: Comando não encontrado