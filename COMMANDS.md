# Comandos Úteis - Brain Agriculture

## Inicialização Rápida

```bash
# Clone e entre na pasta do projeto
cd /home/amaral/tests/brain-agriculture

# Instale as dependências
npm install

# Suba todos os serviços com Docker
npm run docker:up

# Teste a API
curl http://localhost:3001/api
curl http://localhost:3001/api/health
```

## Comandos Docker

```bash
# Subir todos os serviços (desenvolvimento)
npm run docker:up

# Ver logs dos containers
npm run docker:logs

# Parar todos os serviços
npm run docker:down

# Ver status dos containers
docker compose ps
```

## Comandos de Desenvolvimento

```bash
# Rodar API localmente (com PostgreSQL no Docker)
docker compose up postgres -d
npm run dev:api

# Rodar API com debug
npm run dev:debug --workspace=apps/api

# Instalar dependência na API
npm install <pacote> --workspace=apps/api

# Rodar testes da API
npm run test --workspace=apps/api
```

## Acesso aos Serviços

- **API**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/api/health
- **PostgreSQL**: localhost:5432
  - Database: brain_agriculture
  - Username: postgres  
  - Password: postgres

## Estrutura Atual

```
brain-agriculture/
├── apps/
│   ├── api/              # NestJS API ✅
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   ├── app.controller.ts
│   │   │   ├── app.service.ts
│   │   │   └── entities/
│   │   ├── Dockerfile
│   │   └── package.json
│   └── ui/               # Placeholder para UI 📋
│       └── package.json
├── docker-compose.yml    # Desenvolvimento
├── init-db/             # Scripts SQL iniciais
├── package.json         # Workspace root
└── README.md
```

## Status do Projeto ✅

- ✅ Monorepo configurado com npm workspaces
- ✅ API NestJS funcionando
- ✅ TypeORM configurado com PostgreSQL
- ✅ Docker Compose configurado para desenvolvimento
- ✅ Endpoints Hello World e Health Check
- ✅ Ambiente otimizado para desenvolvimento
- 📋 UI - aguardando implementação futura