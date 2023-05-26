# Quiz API

## Descrição

Esse projeto é um API para um serviço de questionários, criado para o desafio proposto pela Ancar.

## Instalação

```bash
npm install
```

## Execução do projeto

Para rodar o projeto localmente:

```bash
# development
$ npm start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Para rodar o projeto utilizando o docker:

```bash
docker compose up
```

## Extras

Foram criados alguns serviços extras para a implementação de uma aplicação mais coesa, do ponto de visto do desenvolvedor (eu).
Foram criados os endpoints:

* `/questionarios/to-answer`: Que lista os questionários criados por outros usuários e que ainda não foram respondidos pelo usuário logado.
* `/questionarios/my`: Que lista os questionários criados pelo usuário logado.
* `/questionarios/{id}/respostas/relatorio`: Que retorna o questionário, informando a quantidade de vezes que cada resposta foi selecionada.
* `/auth/login`: Que realiza a autenticação no sistema e obtêm um token de acesso.
