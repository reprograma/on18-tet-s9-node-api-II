##Documentação 

[GET] "/filmes/catalogo" 
    - 200: retornar todos os filmes
    - 500: algo errado aconteceu                           

- [GET] "/filmes/pesquisar/:id" 
    - 200: retorna o filme com id selecionado
    - 404: filme não existe                                

- [GET] "/filmes/pesquisar?titulo "
    - 200: retorna o filme com titulo selecionado
    - 404: filme não existe                                

- [GET] "/filmes/catalogo/pesquisar?genero "
    - 200: retorna o filme com genero selecionado
    - 404: filme não existe                                

- [POST]"/filmes/cadastrar" 
    - 201: cadastra um novo filme                          

- [PATCH]"/filmes/update/titulo/:id"
    - 200: retorna o filme com novo titulo   
    - 500: algo errado aconteceu                

- [PUT]"/filmes/substitur/:id" 
    - 200: retorna o filme com id selecionado com todas as informações substituídas

- [PUT]"/filmes/update/generico/:id"
    - 200: retorna o filme com id selecionado com campo escolhido editado
    - 500: algo errado aconteceu 

*

- [GET] "/series/catalogo" 
    - 200: retornar todas os series
    - 500: algo errado aconteceu                            

- [GET] "/series/pesquisar/:id" 
    - 200: retorna o serie com id selecionado
    - 404: serie não existe                                 

- [GET] "/series/pesquisar?titulo "
    - 200: retorna o serie com titulo selecionado
    - 404: serie não existe                                 

- [GET] "/series/catalogo/pesquisar?genero "
    - 200: retorna o serie com genero selecionado
    - 404: serie não existe                                 

- [POST]"/series/cadastrar" 
    - 201: cadastra uma nova serie                          

- [PATCH]"/series/update/titulo/:id"
    - 200: retorna a serie com novo titulo
    - 500: algo errado aconteceu                       

- [PUT]"/series/substitur/:id" 
    - 200: retorna a serie com id selecionado com todas as informações substituídas

- [PUT]"/series/update/generico/:id"
    - 200: retorna a serie com id selecionado com campo escolhido editado
    - 500: algo errado aconteceu