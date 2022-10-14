- FILMES

- [GET] "/catalogo" 
    - 200: retornar todos os filmes
    - 500: algo errado aconteceu

- [GET] "/filmes/pesquisar/:id" 
    - parametro: id
    - 200: retorna o filme com id selecionado
    - 404: filme não encontrado

- [GET] "/catalogo/buscar "
    - query: generp = " "
    - 200: retorna o filme com nome selecionado
    - 404: filme não encontrado

- [PUT]"/update/dados/:id" 
    - 500: alterar dados de um filme

- [PACTH]""

***
- SERIES

- [GET] "/series" 
    - 200: retornar todas os series
    - 500: algo errado aconteceu

- [GET] "/pesquisar/:id" 
    - parametro: id
    - 200: retorna o serie com id selecionado
    - 500: serie não encontrada

- [PUT]"/update/dados/:id" 
    - 200: alterar dados de uma serie
    - 500: dados incorretos

- [GET] "/catalogo/buscar "
- query: genero = " "
- 200: retorna a serie com nome selecionado
- 404: serie não existe

- [PACTH]""