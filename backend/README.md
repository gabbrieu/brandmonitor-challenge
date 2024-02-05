## Responsabilidade

O Backend é responsável por receber os inputs de pesquisa do usuário e repassar para o robô em Go. O robô retorna com os resultados para o backend que os salva no MongoDB e os encaminha para o Frontend.

## Variáveis de ambiente
- `API_PORT`: Porta onde ficará localizado a aplicação backend.
- `MONGO_INITDB_ROOT_USERNAME`: Nome do "superuser" com a role de root criado inicialmente pelo Docker para o MongoDB no banco de autenticação `admin`.
- `MONGO_INITDB_ROOT_PASSWORD`: Senha do "superuser" com a role de root criado inicialmente pelo Docker para o MongoDB no banco de autenticação `admin`.
- `MONGOEXPRESS_LOGIN`: Usuário responsável por logar na aplicação Mongo Express para visualização de dados do MongoDB.
- `MONGOEXPRESS_PASSWORD`: Senha do usuário responsável por logar na aplicação Mongo Express para visualização de dados do MongoDB.

## Testes

Para rodar os testes execute o seguinte comando a partir da pasta atual (backend): 
```bash
yarn test:cov
```

O comando executará os testes e retornará o coverage da API.