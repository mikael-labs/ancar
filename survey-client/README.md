# Quiz Frontend

## Descrição

Esse projeto é um frontend para um serviço de questionários, criado para o desafio proposto pela Ancar.

## Instalação

```bash
npm install
```

## Configuração

Para o projeto ser executado, ele precisa de algumas variáveis de ambiente, estas que são:

```.env
VITE_API_URL= Url da API de questionários
```

Dito isso, crie um arquivo .env na raiz do projeto especificando essas variáveis.

## Execução do projeto

Para rodar o projeto execute:

```bash
npm start
```

## Extras

Foram criadas algumas telas/funcionalidades extras para a realização de uma aplicação mais completa, estas que são:

* Login
* Cadastro
* Visualização de "relatório" do questionário
* Visualização de "Meus Questionários"
* Visualização de "Questionários", que exibe apenas os questionários ainda não respondidos e não criados pelo usuário logado
