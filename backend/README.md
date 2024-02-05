## Rodando o Backend individualmente

Para executar o backend sem o Docker de forma individual execute o seguinte comando:

```bash
yarn start:dev
```

O comando iniciará um servidor de desenvolvimento com watcher de arquivos na porta `${API_PORT}`.

## Testes

Para rodar os testes execute o seguinte comando: 
```bash
yarn test:cov
```

O comando executará os testes e retornará o coverage da API.