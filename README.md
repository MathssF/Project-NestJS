# Project-NestJS

## Descrição do Peojeto:

Este é um projeto de uma aplicação de filmes desenvolvida com NestJS. A aplicação permite gerenciar e consultar informações sobre filmes, incluindo detalhes como título, descrição, ano de lançamento e gênero.

## Documentação e Teste com Swagger

Para testar o projeto, baixe-o localmente, utilize o Swagger, disponível na rota /api. O Swagger fornece uma interface interativa para explorar e testar as diferentes rotas e funcionalidades da aplicação. Através do Swagger, é possível realizar chamadas HTTP diretamente, visualizar os endpoints disponíveis, seus parâmetros e as respostas esperadas.

## Tecnologias Utilizadas


-> TypeScript: Utilizado para garantir tipagem estática e facilitar a manutenção do código.

-> NestJS: Esta foi minha primeira aplicação com NestJS. Aprendi bastante sobre a estrutura modular do framework e como ele facilita a criação de aplicações escaláveis e bem organizadas.

-> Swagger: Também foi minha primeira experiência com Swagger. Foi muito útil para documentar e testar a API de forma rápida e eficiente.

-> JWT (JSON Web Token): Implementado para autenticação, garantindo segurança nas operações da aplicação.

-> Redis: Utilizado para armazenamento em cache, melhorando a performance da aplicação.

-> TypeORM: Usado como ORM (Object-Relational Mapping) para gerenciar a comunicação com o banco de dados de forma mais intuitiva e eficiente.

-> PostgreSQL: Utilizado como banco de dados relacional para armazenar de forma segura e eficiente as informações sobre os filmes.

-> Docker: Utilizado para containerizar a aplicação, garantindo um ambiente consistente de desenvolvimento e facilitando o deploy.

## Rotas e Lógica:

### /movie/genres
Retorna todos os gêneros disponíveis. É uma lista de objetos de gênero que contém o nome e o ID do gênero.

### /movie/genres-names
Retorna os nomes de todos os gêneros disponíveis. É uma lista de strings com os nomes dos gêneros.

### /movie/list
Retorna todos os filmes disponíveis. É uma lista de objetos de filme com informações detalhadas sobre cada filme.

### /movie/by-id/:id
Retorna um filme específico pelo seu ID. O ID do filme é passado como parâmetro na URL.

### /movie/by-genre/:id
Retorna todos os filmes que pertencem a um gênero específico, identificado pelo ID do gênero. O ID do gênero é passado como parâmetro na URL.

### /movie/by-genre-name/:name
Retorna todos os filmes que pertencem a um gênero específico, identificado pelo nome do gênero. O nome do gênero é passado como parâmetro na URL.

### /movie/vote/:id
Permite que um usuário vote em um filme específico, identificado pelo ID do filme. O ID do filme é passado como parâmetro na URL. A votação é feita enviando um corpo de requisição contendo o valor do voto (entre 1 e 5).

### /movie
Cria um novo filme. A criação do filme é feita enviando um corpo de requisição com as informações do filme, como nome, descrição, data de lançamento e gêneros associados.

### /movie/:id
Atualiza as informações de um filme específico, identificado pelo ID do filme. O ID do filme é passado como parâmetro na URL. A atualização é feita enviando um corpo de requisição com as novas informações do filme.

### /movie/:id
Deleta um filme específico, identificado pelo ID do filme. O ID do filme é passado como parâmetro na URL.
