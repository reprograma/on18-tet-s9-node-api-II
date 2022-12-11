## Documentação

## Reprogramaflix

- Explicação do projeto: para os dois jsons (filmes e series) crie as rotas de retorno de todos os filmes e de todas as series, por id, por titulo e por qualquer chave/valor. Crie a rota de criação de filme e serie.

- Documente sua API

- DESAFIO: encontre e construa casos de erro

- [GET] "/filmes" 
    - 200: retornar todos os filmes
    - 500: algo errado aconteceu

- [GET] "/filmes/pesquisar/:id" 
    - parametro: id
    - 200: retorna o filme com id selecionado
    - 404: filme não existe

- [GET] "/filmes/pesquisar?titulo "
    - query: titulo = " "
    - 200: retorna o filme com nome selecionado
    - 404: filme não existe

- [GET] "/filmes/buscar?  "
    - 200: retorna o filme selecionado
    - 404: dados incorretos

- [POST]"/filmes/cadastrar" 
    - 201: cadastra um novo filme

***

- [GET] "/series" 
    - 200: retornar todas os series
    - 500: algo errado aconteceu

- [GET] "/series/pesquisar/:id" 
    - parametro: id
    - 200: retorna o serie com id selecionado
    - 404: serie não existe

- [GET] "/series/pesquisar?titulo "
    - query: titulo= ""
    - 200: retorna o serie com nome selecionado
    - 404: serie não existe

- [GET] "/series/pesquisar? "
    - query: 
    - 200: retorna o serie selecionada
    - 404: dados incorretos

- [POST]"/series/cadastrar" 
    - 201: cadastra um nova serie
    - 500: dados incorretos