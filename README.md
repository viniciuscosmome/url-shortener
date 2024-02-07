# Encurtador de URLs

## Índice

1. [Requisitos](#requisitos)
   - [Clone o repositório](#clone-o-repositório)
1. [Configure as variáveis de ambiente](#configure-as-variáveis-de-ambiente)
1. [Execute a aplicação usando o Docker Compose](#execute-a-aplicação-usando-o-docker-compose)
1. [Acesse as rotas documentadas da API com o Swagger](#acesse-as-rotas-documentadas-da-api-com-o-swagger)
1. [licença](#licença)

## Requisitos

1. Um editor de código de sua preferência
1. Docker + docker compose

### Clone o repositório

> [!note]\
> Para clonar desse modo você precisa do [`git`](https://git-scm.com/downloads) instalado.

Use o comando abaixo para clonar este repositório.

```bash
git clone https://github.com/viniciuscosmome/url-shortener.git
```

Após clonar o repositório, acesse a pasta criada `url-shortener` com seu editor de código

## Configure as variáveis de ambiente

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

# Configurações da base de dados
POSTGRES_USER=adminuser
POSTGRES_PASSWORD=adminpass
POSTGRES_DB=url-shortener
POSTGRES_HOST=postgres_main
POSTGRES_PORT=5432

# Use esta URL como está
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"
```

## Execute a aplicação usando o Docker Compose

Após configurar as variáveis de ambiente, execute o comando abaixo para que o ambiente no docker seja configurado e a aplicação inicie.

```bash
# [docker compose] -> comando para usar o compose
# [-f filename.yml] -> para selecionar um arquivo de configuração
# [up] -> para criar e iniciar o container
# [-d] -> para executar o container em segundo plano
docker compose -f docker-compose.dev.yml up -d
```

## Acesse as rotas documentadas da API com o Swagger

Após a inicialização da API uma documentação estará disponível na rota `/docs`

> [!note]\
> PORT tem o mesmo valor da variável de ambiente `PORT` que você escolheu para a sua aplicação.

```md
http://localhost:PORT/docs
```

## Licença

url-shortener [licença MIT](https://github.com/viniciuscosmome/url-shortener/blob/main/LICENSE)
