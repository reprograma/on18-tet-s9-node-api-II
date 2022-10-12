# Reprogramaflix



- [GET] "/filmes"
    * Retornar todos os filmes
- [GET] "filmes/pesquisar/:id"
    * Retorna um filme por id 
- [GET] "filmes/pesquisar/:titulo"
    * Retorna filme por título
    * Retorna erro 404 com a mensagem: "filme não encontrado" caso o cliente digitar nome errado
- [GET] "filmes/buscar/:genero"
    * Retorna filme por genero
    * Retorna erro 404 com a mensagem: "genero não encontrado" caso o cliente digitar nome errado
- [POST] "/filmes/cadastrar"
    * Cadastra um novo filme 
- [PUT]/filmes/update/generico/:id
    * Atualiza um filme por inteiro
- [PATCH]/series/updatetitulo/:id
    * Atualiza apenas o titulo


- [GET] "/series"
    * Retornar todas as series
- [GET] "series/pesquisar/:id"
    * Retorna uma série por id 
- [GET] "series/pesquisar/:titulo"
    * Retorna serie por título
    * Retorna erro 404 com a mensagem: "serie não encontrada" caso o cliente digitar nome errado
- [GET] "series/buscar/:genero"
    * Retorna serie por genero
    * Retorna erro 404 com a mensagem: "serie não encontrada" caso o cliente digitar nome errado
- [POST] "/series/cadastrar"
    * Cadastra uma nova serie
- [PUT]/series/update/generico/:id
    * Atualiza um filme por inteiro
- [PATCH]/series/updatetitulo/:id
    * Atualiza apenas o titulo