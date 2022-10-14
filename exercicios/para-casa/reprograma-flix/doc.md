## Documentação

## Reprogramaflix

- Usando a arquitetura MVC construa a API  que foi pedida pela galera de negocio.
- Documente sua API de forma adequada


- [GET] "/filmes/catalogo" 
    - 200: retornar todos os filmes
    - 500: ERRO DO SERVIDOR                           

- [GET] "/filmes/pesquisar/:id" 
    - parametro: id
    - 200: retorna o filme com id selecionado
    - 404: filme não encontrado/existente                                

- [GET] "/filmes/pesquisar?titulo "
    - query: titulo = " "
    - 200: retorna o filme com titulo selecionado
    - 404: filme não existe                                

- [GET] "/filmes/catalogo/pesquisar?genero " ==> NAO CONSEGUIR RETORNAR NO INSOMNIA
    - query: genero = " "
    - 200: retorna o filme com genero selecionado
    - 404: filme não encontrado no catalogo

- [POST]"/filmes/cadastrar" 
    - 201: cadastra um novo filme                          

- [PATCH]"/filmes/update/titulo/:id"
    - query: novo titulo = " "
    - 200: retorna o filme com novo titulo   
    - 500: algo errado aconteceu                

- [PUT]"/filmes/atualizar/:id" 
    - parametro id
    - 200: retorna o filme com id selecionado com todas as informações substituídas

- [PUT]"/filmes/update/generico/:id" ==> NAO CONSEGUIR RETORNAR NO INSOMNIA
    - parametro id
    - query: key = " "
    - 200: retorna o filme com id selecionado com campo escolhido editado
    - 500: algo errado aconteceu 

***************************

 [GET] "/series/catalogo" - OK!
    - 200: retornar todas os series
    - 500: algo errado aconteceu                            

- [GET] "/series/pesquisar/:id"  - ESTÁ RETORNANDO OS FILMES
    - parametro: id
    - 200: retorna o serie com id selecionado
    - 404: serie não existe                                 

- [GET] "/series/pesquisar?titulo " - OK!
    - query: titulo= ""
    - 200: retorna o serie com titulo selecionado
    - 404: serie não existe                                 

- [GET] "/series/catalogo/pesquisar?genero " - NÃO CONSEGUIR RODAR NO INSOMNIA
    - query: genero= ""
    - 200: retorna o serie com genero selecionado
    - 404: serie não existe                                 

- [POST]"/series/cadastrar"  - OK!
    - 201: cadastra uma nova serie                          

- [PATCH]"/series/update/titulo/:id" - OK!
    - query: novo titulo = " "
    - 200: retorna a serie com novo titulo
    - 500: algo errado aconteceu                       

- [PUT]"/series/substitur/:id"  - OK!
    - parametro id
    - 200: retorna a serie com id selecionado com todas as informações substituídas

- [PUT]"/series/update/generico/:id" - NÃO CONSEGUIR
    - parametro id
    - query: key = " "
    - 200: retorna a serie com id selecionado com campo escolhido editado
    - 500: algo errado aconteceu