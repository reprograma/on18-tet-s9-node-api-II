# Documentação API

## Reprogramaflix

# Explicação do projeto:

- Usando a arquitetura MVC construa a API  que foi pedida pela galera de negocio.
- Documente sua API de forma adequada

### Pedidos de negócio
- [ ] Rota com todos os filmes e series
- [ ] Duas rotas:
-        /filmes deve retornar todos os filmes
-        /series deve retornar todos as series
- [ ] Filtrar por titulo, id e genero
- [ ] Cadastrar filmes e series
- [ ] Editar o nome de qualquer um deles
- [ ] Substituir tudo de um filme ou serie
- [ ] Eitar qualquer campo deles
- [ ] Casos de erro

>>>>>>>>>>>> FILMES

Documentando API
# Rotas

- [GET] "/filmes/catalogo" 
    - 200: retornar todos os filmes e series
    - 500: Erro

- [GET] "/filmes/pesquisar/:id" 
    - parametro: id
    - 200: retorna o filme com id selecionado
    - 404: filme não encontrado

- [GET] "/filmes/pesquisar?titulo "
    - query: titulo = " "
    - 200: retorna o filme com nome selecionado
    - 404: filme não encontrado

- [GET] "/filmes/buscar?  "
    - 200: retorna o filme selecionado
    - 404: dados incorretos

- [POST]"/filmes/cadastrar" 
    - 201: Cadastrar um novo filme

>>>>>>>>>>>>> SERIES

<!-- - [GET] "/series" 
    - 200: retornar todas os series
    - 500: Erro

- [GET] "/series/pesquisar/:id" 
    - parametro: id
    - 200: retorna o serie com id selecionado
    - 404: serie não encontrada

- [GET] "/series/pesquisar?titulo "
    - query: titulo= ""
    - 200: retorna o serie com nome selecionado
    - 404: serie não encontrada

- [GET] "/series/pesquisar? "
    - query: 
    - 200: retorna o serie selecionada
    - 404: dados incorretos

- [POST]"/series/cadastrar" 
    - 201: cadastrar uma nova serie
    - 500: dados incorretos --> -->