# Desafio toroback
## Instalação do PSQL
Para realizar a instalação do PSQl basta seguir o passo-a-passo a seguir:
1. Acesse esse [link](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) para fazer o download.

2. Após escolher a versão desejada e seu OS, basta abrir o instalador.

3. Ao iniciar o instalador, clique em "Next", escolha o local de instalação e lembre-se de marcar quaisquer opções relacionadas ao 'PATH' ou 'Command Line Tools'.

### Criando o Banco de dados
Acesse o terminal do seu OS escolhido e digite comando abaixo: Neste exemplo utilizamos o usuário postgres.

`psql -U postgres`

Após digite uma senha para o usuário, que neste exemplo utilizamos a senha 123456.

Após isso digite o comando abaixo para realizar a criação do Banco de Dados:

`CREATE DATABASE toroback`

# Instalando as dependências
Após seguir os passos anteriores, abra o terminal na pasta do repositório e executar o comando abaixo para realizar a instalação das dependências.

`npm install`

### Configuração adicionais
Caso na criação do banco de dados utilize usuário e senha diferente, acesse o arquivo __knexfile.js__ e realize as mudanças necessárias.

## Migrations
No terminal execute o comando abaixo para realizar a migrations do banco de dados.

`knex migrate:latest`

# Executando a API
No terminal execute o comando abaixo para realizar inicializar a API.

`npm start`

### Documentação da API
Após o comando acima, para acessar a documentação da API, acesse em seu navegador http://localhost:3000/doc/ para acessar a documentação da API e seu funcionamento.
