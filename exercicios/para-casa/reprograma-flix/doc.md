## Documentação

## Reprogramaflix

- Usando a arquitetura MVC construa a API  que foi pedida pela galera de negocio.
- Documente sua API de forma adequada


- [GET] "/filmes/catalogo" 
    - 200: retornar todos os filmes
    - 500: algo errado aconteceu                           

- [GET] "/filmes/pesquisar/:id" 
    - parametro: id
    - 200: retorna o filme com id selecionado
    - 404: filme não existe                                

- [GET] "/filmes/pesquisar?titulo "
    - query: titulo = " "
    - 200: retorna o filme com titulo selecionado
    - 404: filme não existe                                

- [GET] "/filmes/catalogo/pesquisar?genero "
    - query: genero = " "
    - 200: retorna o filme com genero selecionado
    - 404: filme não existe                                

- [POST]"/filmes/cadastrar" 
    - 201: cadastra um novo filme                          

- [PATCH]"/filmes/update/titulo/:id"
    - query: novo titulo = " "
    - 200: retorna o filme com novo titulo   
    - 500: algo errado aconteceu                

- [PUT]"/filmes/substitur/:id" 
    - parametro id
    - 200: retorna o filme com id selecionado com todas as informações substituídas

- [PUT]"/filmes/update/generico/:id"
    - parametro id
    - query: key = " "
    - 200: retorna o filme com id selecionado com campo escolhido editado
    - 500: algo errado aconteceu 

*

- [GET] "/series/catalogo" 
    - 200: retornar todas os series
    - 500: algo errado aconteceu                            

- [GET] "/series/pesquisar/:id" 
    - parametro: id
    - 200: retorna o serie com id selecionado
    - 404: serie não existe                                 

- [GET] "/series/pesquisar?titulo "
    - query: titulo= ""
    - 200: retorna o serie com titulo selecionado
    - 404: serie não existe                                 

- [GET] "/series/catalogo/pesquisar?genero "
    - query: genero= ""
    - 200: retorna o serie com genero selecionado
    - 404: serie não existe                                 

- [POST]"/series/cadastrar" 
    - 201: cadastra uma nova serie                          

- [PATCH]"/series/update/titulo/:id"
    - query: novo titulo = " "
    - 200: retorna a serie com novo titulo
    - 500: algo errado aconteceu                       

- [PUT]"/series/substitur/:id" 
    - parametro id
    - 200: retorna a serie com id selecionado com todas as informações substituídas

- [PUT]"/series/update/generico/:id"
    - parametro id
    - query: key = " "
    - 200: retorna a serie com id selecionado com campo escolhido editado
    - 500: algo errado aconteceu