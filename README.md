# Encurtador de URLs

<details>
  <summary>Índice</summary>

1. [Requisitos](#requisitos)
1. [Configurando variáveis de ambiente](#configurando-variáveis-de-ambiente)
1. [Executando localmente (sem Docker)](#executando-localmente-sem-docker)
   - [Instalando as dependências](#instalando-as-dependências)
   - [Executando a aplicação de desenvolvimento](#executando-a-aplicação-de-desenvolvimento)
     1. [Preparando o banco de dados](#preparando-o-banco-de-dados)
     1. [Iniciando a aplicação](#iniciando-a-aplicação)
1. [Executando no Dokcer com docker compose](#executando-no-dokcer-com-docker-compose)
   - [Preparando o ambiente e iniciando a aplicação](#preparando-o-ambiente-e-iniciando-a-aplicação)
1. [Documentação com o Swagger](#documentação-com-o-swagger)
1. [licença](#licença)

</details>

## Requisitos

1. [Node.js - v20.11](https://nodejs.org/en) LTS - última versão estável hoje
2. Um editor de código de sua preferência

### Clonando o repositório

> [!note]\
> Para clonar desse modo você precisa do [`git`](https://git-scm.com/downloads) instalado.

Use o comando abaixo para clonar este repositório.

```bash
git clone https://github.com/viniciuscosmome/url-shortener.git
```

Após clonar o repositório, acesse a pasta criada (url-shortener) com seu editor de código

## configurando variáveis de ambiente

O arquivo `.env.example` tem uma cópia das variáveis de ambiente necessárias com valores de exemplo.

Crie um arquivo `.env` na raiz do repositório definindo suas variáveis para poder executar a aplicação.

```bash
# Define qual o ambiente em que a aplicação está executando
NODE_ENV=development

# Define em qual porta a aplicação irá executar
PORT=3000

# Define quantas vezes o hash da senha irá repetir
# -> CUIDADO! Quanto maior o número, mais o hash demora recurso para minimizar ataques de sonegação de serviço
#   detalhes: https://www.npmjs.com/package/bcrypt#a-note-on-rounds
PASSWORD_SALT_ROUNDS=2

# Uma senha usada para criar o token de autenticação necessário para acesso a recursos (rotas) protegidos da aplicação.
JWT_SECRET=super-secret-password

# O caminho local onde a base de dados será armazenada.
# -> OBS: Estou usando SQLite, mas em um mundo ideal usariamos um SGBD mais robusto como PostgreSQL.
DATABASE_PATH="file:./database/url-shortener.db"
```

## Executando localmente (sem Docker)

<details>
  <summary>Instalando as dependências</summary>

### Instalando as dependências

O comando abaixo vai baixar todas as dependencias do projeto para você rodar localmente.

O atributo "--exact" garante que você baixe a versão atual dos pacotes utilizados.

```bash
npm install --exact
```

### Executando a aplicação de desenvolvimento

#### Preparando o banco de dados

Executa as migrações da base de dados e gera o arquivo `@prisma/client`

```bash
npm run prisma:setup:dev
#ou
npx prisma migrate dev && npx prisma generate
```

#### Iniciando a aplicação

```bash
# Ambiente de desenvolvimento
npm run start

# Ambiente de desenvolvimento ('watch' mode)
npm run start:dev
```

</details>

## Executando no Dokcer (com docker compose)

### Preparando o ambiente e iniciando a aplicação

> [!note]\
> Você não precisa executar a aplicação com docker

Após configurar as variáveis de ambiente, execute o comando abaixo para que o ambiente no docker seja configurado e a aplicação inicie

```bash
# [docker compose] -> comando para usar o compose
# [-f filename.yml] -> para selecionar um arquivo de configuração
# [up] -> para criar e iniciar o container
# [-d] -> para executar o container em segundo plano
docker compose -f docker-compose.dev.yml up -d
```

## Documentação com o Swagger

Após a inicialização da API uma documentação estará disponível na rota `/docs`

```md
http://localhost:3000/docs
```

## Licença

url-shortener [licença MIT](https://github.com/viniciuscosmome/url-shortener/blob/main/LICENSE)
