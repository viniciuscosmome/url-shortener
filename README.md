# Encurtador de URLs

## Requisitos

1. [Node.js - v20.11](https://nodejs.org/en) - LTS última versão estável hoje

### Clonando o repositório

> [!note]\
> Para clonar desse modo você precisa do `git` instalado.

Use o comando abaixo para clonar este repositório.

```bash
git clone https://github.com/viniciuscosmome/url-shortener
```

## Configure as variáveis de ambiente

O arquivo `.env.example` tem uma cópia das variáveis de ambiente necessárias com valores de exemplo.

Crie um arquivo `.env` na raiz do repositório definindo suas variáveis para poder executar a aplicação.

```bash
# Define em qual a porta a aplicação irá executar
PORT=3000

# Define quantas vezes o hash da senha irá repetir
# -> CUIDADO!
# Quanto maior o número, mais o hash demora (recurso para minimizar ataques de sonegação de serviço)
PASSWORD_SALT_ROUNDS=2

# Uma senha usada para criar o token de autenticação a recursos protegidos da aplicação.
JWT_SECRET=super-secret-password

# O caminho local onde a base de dados será armazenada.
# OBS: Estou usando SQLite, mas em um mundo ideal, usariamos um SGBD mais robusto como PostgreSQL.
DATABASE_PATH="file:./database/url-shortener.db"
```

## Instale as dependências

O comando abaixo vai baixar todas as dependencias do projeto para você rodar localmente.

O atributo "--exact" garante que você baixe a versão atual dos pacotes utilizados.

```bash
npm install --exact
```

## Executando a aplicação

### Ambiente de desenvolvimento

Executa as migrações da base de dados e gera o arquivo `@prisma/client`

```bash
npm run prisma:setup:dev
#ou
npx prisma migrate dev && npx prisma generate
```

Inicie a aplicação de desenvolvimento

```bash
# Ambiente de desenvolvimento
npm run start

# Ambiente de desenvolvimento ('watch' mode)
npm run start:dev
```

## Licença

url-shortener [licença MIT](https://github.com/viniciuscosmome/url-shortener/blob/main/LICENSE)
