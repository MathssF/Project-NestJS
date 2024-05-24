# Project-NestJS

## Objetivos:

[] Desenvolver um sistema de autenticação JWT.
[X] Cconstruir uma CRUD de um catálogo de filmes.
[] Todos os endpoints dessa CRUD só devem ser consumidos por um usuário autenticado.
[] Usar Redis como cache
[] Fazer Deploy

## Ferramentas requeridas:

[X] TypeScript
[X] Nest.js
[X] TypeORM
[] Swagger
[X] Docker
[] Redis
[X] PostgreSQL

Projeto não finlizado a tempo (dia 23/05)

## Dificuldades do projeto:

#### JWT:

Eu não consegui criar a aplicação valida.
Quando eu fazia a aplicação do guard não ser global, eu não conseguia usar ela em nenhuma requisição.
Quando eu fazia a aplicação do guard ser global, eu não conseguia fazer a exeção das rotas públicas

#### Redis:

As aplicações do Redis estavam dando problema de não encontrar os caches. Então eu tirei a principio para coloca-lo novamente no final do projeto. Acabou que não voltei para ele, mas deixei a lógica dele no movie.controller.md onde ta escrito toda o código que seria usado se o Redis tivesse funcionando.