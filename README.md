# Desafio Desenvolvedor Pleno

## Tecnologias

- Frontend: ReactJS
- Backend: NestJS + MongoDB
- Robot: Go

## Pré-requisitos

1. Tenha o docker e o docker compose instalados na sua máquina.

## Começando

1. Para rodar localmente, crie um arquivo .env na raiz da pasta seguindo o exemplo do arquivo `.env.example`.

## Rodando a aplicação

Para rodar a aplicação, execute o seguinte comando a partir da pasta raíz do projeto:

```bash
docker compose up -d
```

## Principais pastas


### `backend/`

Pasta que contém os arquivos responsáveis pelo backend que repassam os inputs inseridos do usuário para o Go, pega o result gerado e grava no MongoDB.

### `frontend/`

Pasta que contém os arquivos do frontend na qual o usuário insere os inputs necessários para a pesquisa do google.

### `robot/`

Pasta que contém os arquivos em Golang na qual são responsáveis pelo scraping da pesquisa no Google.

## Endpoints

-   Página do frontend com os campos da pesquisa - `localhost:${FRONTEND_PORT}`
-   Endpoint do backend responsável pelo processamento da pesquisa - POST `localhost:${API_PORT}/google-search`
-   Endpoint do robô responsável pelo scraping dos dados - POST `localhost:${ROBOT_PORT}/scraping`


O frontend é responsável pelos campos de pesquisa (Palavras-chave, frequência e localização). Os campos são enviados para o backend na qual encaminha para o robô em Go. O robô faz o trabalho do scraping no google de acordo com os campos inseridos pelo o usuário e retorna os dados para o backend. O backend salva então os resultados no MongoDB e retorna os resultados para a aplicação frontend para exibir para o usuário final.