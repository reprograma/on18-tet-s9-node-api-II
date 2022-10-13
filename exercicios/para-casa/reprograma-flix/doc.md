
### DOCUMENTACAO

- FILMES
    [GET]   "/filmes" 
        - 200: retornar todos os filmes
        - 500: algo errado aconteceu

    [GET]   "/filmes/pesquisar/titulo"
        - 200: retornar todos os filmes com o titulo pesquisado
        - 404: algo errado aconteceu

    [GET]   "/filmes/pesquisar/:id"
        - 200: retornar filme com id correspondente
        - 404: algo errado aconteceu

    [GET]   "/filmes/pesquisar/genero"
        - 200: retornar todos os filmes do genero
        - 500: algo errado aconteceu

    [POST]  "/filmes/cadastrar"
        - 200: retornar novo filme cadastrado
        - 500: algo errado aconteceu

    [PATCH] "/filmes/editar/titulo"
        - 200: retornar filme editado
        - 500: algo errado aconteceu

    [PUT]   "/filmes/substituir/:id"
        - 200: retornar filme editado
        - 500: algo errado aconteceu

    [PUT] "/filmes/update/generico/:id"
        - 200: retornar filme atualizado
        - 404: algo errado aconteceu
        
- SERIES
    [GET]   "/series" 
        - 200: retornar todos os filmes
        - 500: algo errado aconteceu

    [GET]   "/series/pesquisar/titulo"
        - 200: retornar todos as series com titulo pesquisado
        - 404: algo errado aconteceu
        
    [GET]   "/series/pesquisar/:id"
        - 200: retornar serie com o id correspondente
        - 404: algo errado aconteceu
        
    [GET]   "/series/pesquisar/genero"
        - 200: retornar todas as series do genero
        - 500: algo errado aconteceu
        
    [POST]  "/series/cadastrar"
        - 200: retornar nova serie cadastrada
        - 500: algo errado aconteceu

    [PATCH] "/series/editar/titulo"
        - 200: retornar serie editada
        - 500: algo errado aconteceu

    [PUT]   "/series/substituir/:id"
        - 200: retornar serie editada
        - 500: algo errado aconteceu

    [PUT] "/series/update/generico/:id"
        - 200: retornar serie atualizada
        - 404: algo errado aconteceu