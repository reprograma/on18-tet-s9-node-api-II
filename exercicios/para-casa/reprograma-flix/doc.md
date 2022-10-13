Documentação da API Reprogramaflix


Explicação do projeto: para  produção desta API, em que busca fazer rotas para  pesquisa nos dois jsons  de (filmes e series), por id, por titulo e por qualquer chave/valor, e também crair uma  rota de criação de filme e serie. para isso, utilizei :


[Get] "/filmes/Catalogo"
 Para retornar todos os filmes do catalogo;
 O status:  200: retornar todos os filmes;
 O status: 500: algo errado aconteceu.

 [GET]"/filmes/buscar/:id"
 Para fazer uma pesquisa por id;
 O status:  200: retornar  o filmes por id;
 O status: 404: filme não existe


 [GET]"/filmes/pesquisar?:titulo"
 Para fazer uma pesquisa por titulo;
 O status:  200: retornar  o filmes por titulo;
 O status: 404: filme não existe

 [GET] "/filmes/pesquisar?:genero"
 Para fazer uma pesquisa por Genero;
 O status:  200: retornar o filme por Genero;
 O status: 404: filme não existe

[POST]"/filmes/criar"
Para cadrastrar um filme no banco de dados;
 O status:  201: retorna o filme cadrastrado;
 
 [DELETE] "/filmes/deletar/:id"
 Usado para deletar um filme 
  O status:  410: retorna o filme deletado;

  [PATCH]"/filmes/update/:id"
  Usado para atualizar o titulo de um filme. 
  O status:  200: retorna o filme atualizado;

  [PUT] "/filmes/update/generico/:id"
  Usado para atualizar qualquer parte do banco de dados
  O status:  200: retorna o filme atualizado;

  [PUT]"/filmes/update/total/:id"
  Usado para atualizar tudo do indece pesquisado
  O status:  200: retorna o filme atualizado;

// series

[Get] "/series/Catalogo"
 Para retornar todas as series do catalogo;
 O status:  200: retornar todas as series;
 O status: 500: algo errado aconteceu.

 [GET]"/series/buscar/:id"
 Para fazer uma pesquisa por id;
 O status:  200: retornar  a serie por id;
 O status: 404: serie não existe


 [GET]"/series/pesquisar?:titulo"
 Para fazer uma pesquisa por titulo;
 O status:  200: retornar  a serie por titulo;
 O status: 404: serie não existe

 [GET] "/series/pesquisar?:genero"
 Para fazer uma pesquisa por Genero;
 O status:  200: retornar a serie por Genero;
 O status: 404: serie não existe

[POST]"/series/criar"
Para cadrastrar uma serie no banco de dados;
 O status:  201: retorna a serie cadrastrada;
 
 [DELETE] "/series/deletar/:id"
 Usado para deletar uma serie 
  O status:  410: retorna a serie deletada;

  [PATCH]"/series/update/:id"
  Usado para atualizar o titulo de uma serie. 
  O status:  200: retorna a serie atualizada;

  [PUT] "/series/update/generico/:id"
  Usado para atualizar qualquer parte do banco de dados
  O status:  200: retorna a serie atualizada;

  [PUT]"/series/update/total/:id"
  Usado para atualizar tudo do indece pesquisado
  O status:  200: retorna a serie atualizada;



 