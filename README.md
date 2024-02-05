# Desafio Desenvolvedor Pleno

## Tecnologias

- Frontend: [React](https://react.dev/) + [Material UI](https://mui.com/)
- Backend: [NestJS](https://nestjs.com/) + [MongoDB](https://www.mongodb.com/pt-br) com [Mongoose](https://mongoosejs.com/)
- Robot: [Go](https://go.dev/)

## Pré-requisitos

1. Tenha o docker e o docker compose instalados na sua máquina.

## Começando

1. Para rodar localmente, crie um arquivo .env na raiz da pasta seguindo o exemplo do arquivo `.env.example`.

## Rodando a aplicação

Para rodar a aplicação, execute o seguinte comando a partir da pasta raíz do projeto:

```bash
docker compose up -d
```

## Testes

Para rodar os testes entre na pasta backend e execute o seguinte comando: 
```bash
yarn test:cov
```

O comando executará os testes e retornará o coverage da API.


## Principais pastas


### `frontend/`

Pasta que contém os arquivos do frontend na qual o usuário insere os inputs necessários para a pesquisa do google.

### `backend/`

Pasta que contém os arquivos responsáveis pelo backend que repassam os inputs inseridos do usuário para o Go, pega o result gerado, grava no MongoDB e retorna o resultado para o frontend exibir para o usuário.

### `robot/`

Pasta que contém os arquivos em Go na qual são responsáveis pelo scraping da pesquisa no Google.

## Endpoints

-   Página do frontend com os campos da pesquisa - `localhost:${FRONTEND_PORT}`
-   Endpoint do backend responsável pelo processamento da pesquisa - POST `localhost:${API_PORT}/google-search`
-   Endpoint do robô responsável pelo scraping dos dados - POST `localhost:${ROBOT_PORT}/scraping`
-   Mongo Express, aplicação para visualização dos dados armazenados no MongoDB - `localhost:8081`


O frontend é responsável pelos campos de pesquisa (Palavras-chave, frequência e localização). Os campos são enviados para o backend na qual encaminha para o robô em Go. O robô faz o trabalho do scraping no google de acordo com os campos inseridos pelo o usuário e retorna os dados (título das pesquisas do google) para o backend. O backend salva então os resultados no MongoDB e retorna os resultados para a aplicação frontend para exibir para o usuário final.