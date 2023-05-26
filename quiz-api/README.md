# Quiz API

## Descrição

Esse projeto é um API para um serviço de questionários, criado para o desafio proposto pela Ancar.

## Instalação

```bash
npm install
```

## Configuração

Para o projeto ser executado, ele precisa de algumas variáveis de ambiente, estas que são:

```.env
DB_HOST= Host do banco de dados que será utilizado
DB_PORT= Porta do banco de dados
DB_USERNAME= Usuário do banco de dados
DB_PASSWORD= Senha do banco de dados
PORT= Porta na qual a API será executada (opcional, Default=3000)
TOKEN_SECRET= Segredo utilizado para gerar o token de autenticação
```

Dito isso, crie um arquivo .env na raiz do projeto especificando essas variáveis.

## Execução do projeto

Para rodar o projeto sem utilizar o Docker:

```bash
# development
$ npm start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Para rodar o projeto utilizando o Docker:

```bash
docker compose up
```

Após isso, o projeto estará sendo executado na porta especificada nas variáveis de ambiente.

## Extras

Foram criados alguns serviços extras para a implementação de uma aplicação mais completa, estes são:

* `/questionarios/to-answer`: Que lista os questionários criados por outros usuários e que ainda não foram respondidos pelo usuário logado.
* `/questionarios/my`: Que lista os questionários criados pelo usuário logado.
* `/questionarios/{id}/respostas/relatorio`: Que retorna o questionário, informando a quantidade de vezes que cada resposta foi selecionada.
* `/auth/login`: Que realiza a autenticação no sistema e obtêm um token de acesso.

## Mecânica Intepretada

A interpretação do desafio levou ao desenvolvimento de um sistema de questionários múltipla escolha, portanto, cada questionário possui **N** perguntas, cada pergunta possui **N** respostas (escolhas).

Com isso, a resolução de um questionário se dá através de um Array do tipo `{ questionId: number; answerId: number }`;
