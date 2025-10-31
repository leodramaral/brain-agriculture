# 🌾 Brain Agriculture

## 🚀 Como Executar a Aplicação

### Opção 1: Usando Docker (Recomendado)

A forma mais simples de executar todo o sistema:

```bash
# 1. Clone o repositório
git clone <repository-url>
cd brain-agriculture

# 2. Suba todos os serviços
npm run docker:up

# 3. Execute as migrações do banco
npm run db:setup
```

**Serviços disponíveis:**
- 🖥️ **Frontend**: http://localhost:5173
- 🔗 **API**: http://localhost:3001
- 🗄️ **PostgreSQL**: localhost:5432
- 📊 **PgAdmin**: http://localhost:5050

### Opção 2: Desenvolvimento Local

Para desenvolvimento com hot-reload:

```bash
# 1. Instale as dependências
npm run install:all

# 2. Suba apenas o banco de dados
npm run docker:up postgres

# 3. Execute as migrações
npm run db:setup

# 4. Inicie ambos os serviços em modo desenvolvimento
npm run dev
```

**Ou execute separadamente:**

```bash
# Terminal 1 - API
npm run dev:api

# Terminal 2 - Frontend
npm run dev:ui
```

### Scripts Úteis

```bash
npm run build          # Build de produção
npm run test           # Executar todos os testes
npm run lint          # Verificar código
npm run lint:fix      # Corrigir problemas de lint
npm run docker:logs   # Ver logs dos containers
npm run db:reset      # Resetar banco de dados
```

### 🔄 Sobre o Concurrently

O `concurrently` é uma ferramenta essencial para desenvolvimento que permite executar **múltiplos comandos simultaneamente** em um único terminal, com cores diferenciadas para cada processo.

#### Como Funciona no Projeto

Quando você executa:
```bash
npm run dev
```

O `concurrently` internamente executa:
```bash
concurrently "npm run dev:api" "npm run dev:ui"
```

**Isso significa que:**
- ✅ **API** (porta 3001) e **UI** (porta 5173/5174) iniciam **simultaneamente**
- ✅ **Logs coloridos** - cada serviço tem uma cor diferente
- ✅ **Hot-reload** funcionando em ambos
- ✅ **Um único terminal** para desenvolvimento
- ✅ **Ctrl+C** para os dois de uma vez

#### Exemplo de Saída Visual

```bash
[0] [API] Starting NestJS application...
[1] [UI] VITE v7.1.12 ready in 206 ms
[0] [API] Application listening on port 3001
[1] [UI] ➜ Local: http://localhost:5174/
```

#### Configurações Avançadas

Você pode personalizar o `concurrently` com opções como:

```bash
# Com nomes personalizados e cores
concurrently -n "API,UI" -c "blue,green" "npm run dev:api" "npm run dev:ui"

# Com timestamps
concurrently --timestamps "npm run dev:api" "npm run dev:ui"

# Matar todos se um falhar
concurrently --kill-others "npm run dev:api" "npm run dev:ui"
```

#### Alternativas ao Concurrently

**Sem concurrently (tradicional):**
```bash
# Terminal 1
npm run dev:api

# Terminal 2 (novo terminal)
npm run dev:ui
```

**Com concurrently (nossa implementação):**
```bash
# Um único terminal
npm run dev
```

## 📋 Regras de Negócio Implementadas

### 1. Gestão de Produtores
- **Cadastro de Produtores**: CPF ou CNPJ obrigatório com validação
- **Validação de Documentos**: Algoritmo de validação para CPF e CNPJ
- **Nome obrigatório**: Identificação do produtor

### 2. Gestão de Propriedades
- **Associação**: Cada propriedade pertence a um produtor
- **Localização**: Cidade e estado obrigatórios
- **Áreas**: Controle de área total, agrícola e de vegetação
- **Validação de Áreas**: 
  - Área agrícola + vegetação ≤ área total
  - Todas as áreas devem ser valores positivos

### 3. Gestão de Culturas
- **Culturas por Propriedade**: Sistema flexível de culturas plantadas
- **Safras**: Controle por ano de safra
- **Área Plantada**: Controle da área destinada a cada cultura

### 4. Dashboard e Relatórios
- **Métricas Gerais**: Total de fazendas e hectares
- **Análise por Estado**: Distribuição geográfica das propriedades
- **Análise por Cultura**: Distribuição das culturas plantadas
- **Uso da Terra**: Proporção entre área agrícola e vegetação

## 🏗️ Arquitetura do Monorepo

Este projeto utiliza uma arquitetura de **monorepo** com **workspaces** do npm, organizando múltiplas aplicações relacionadas em um único repositório.

### Estrutura do Projeto

```
brain-agriculture/
├── apps/
│   ├── api/          # Backend - API REST
│   └── ui/           # Frontend - Interface web
├── docker-compose.yml
├── package.json      # Scripts e dependências compartilhadas
└── README.md
```

## 🔧 Backend (API)

**Localização**: `apps/api/`

### Tecnologias e Arquitetura

- **Framework**: NestJS com TypeScript
- **Banco de Dados**: PostgreSQL
- **ORM**: TypeORM com migrations
- **Validação**: class-validator + class-transformer
- **Documentação**: Swagger/OpenAPI
- **Testes**: Jest

### Estrutura da API

```
apps/api/src/
├── entities/         # Entidades do banco de dados
├── migrations/       # Migrações do TypeORM
├── produtor/         # Módulo de produtores
├── propriedade/      # Módulo de propriedades
├── dashboard/        # Módulo de dashboard e estatísticas
└── seeds/           # Dados iniciais (se necessário)
```

### Principais Funcionalidades

- **CRUD Completo**: Produtores, propriedades e culturas
- **Validações Robustas**: CPF/CNPJ, áreas, dados obrigatórios
- **API RESTful**: Endpoints padronizados e documentados
- **Agregações SQL**: Queries otimizadas para dashboard
- **Relacionamentos**: Uso adequado de JOINs e relacionamentos

### Endpoints Principais

```
POST   /api/produtores              # Criar produtor
GET    /api/produtores              # Listar produtores
GET    /api/produtores/:id          # Buscar produtor
GET    /api/produtores/:id/propriedades  # Propriedades do produtor

POST   /api/propriedades            # Criar propriedade
POST   /api/propriedades/:id/culturas   # Adicionar culturas
GET    /api/propriedades/:id/culturas   # Listar culturas

GET    /api/dashboard/stats         # Estatísticas para dashboard
```

## 🎨 Frontend (UI)

**Localização**: `apps/ui/`

### Tecnologias e Arquitetura

- **Framework**: React 18 + TypeScript + Vite
- **UI Library**: Chakra UI
- **Gerenciamento de Estado**: Redux Toolkit + RTK Query
- **Roteamento**: React Router DOM
- **Formulários**: React Hook Form + Yup validation
- **Gráficos**: Chart.js + react-chartjs-2
- **Testes**: Jest + React Testing Library

### Arquitetura Frontend

```
apps/ui/src/
├── components/       # Componentes reutilizáveis
│   ├── SummaryCard/  # Card de métricas
│   ├── PieChart/     # Gráficos de pizza
│   └── Layout/       # Layout principal
├── views/           # Páginas/telas
│   ├── Dashboard.tsx # Dashboard principal
│   ├── ProdutorDetails.tsx
│   └── ...
├── store/           # Redux store
│   └── api/         # RTK Query APIs
└── types/           # Tipos TypeScript
```

### Principais Características

- **Design System**: Chakra UI com tema personalizado
- **Responsivo**: Layout adaptável mobile-first
- **Estado Global**: Redux para dados compartilhados
- **Cache Inteligente**: RTK Query para cache de API
- **Formulários Robustos**: Validação em tempo real
- **Gráficos Interativos**: Dashboards com Chart.js

### Funcionalidades da Interface

- **Dashboard Interativo**: 
  - Cards de métricas principais
  - Gráficos de pizza para análises
  - Dados em tempo real
- **Gestão de Produtores**: Formulários de cadastro e edição
- **Gestão de Propriedades**: Interface para propriedades e culturas
- **Navegação Intuitiva**: Menu lateral e breadcrumbs

## 🐳 Docker e Infraestrutura

### Serviços Docker

- **PostgreSQL**: Banco de dados principal
- **PgAdmin**: Interface web para administração do banco
- **API**: Container da aplicação backend (desenvolvimento)

### Variáveis de Ambiente

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=brain_agriculture

# Application
NODE_ENV=development
PORT=3001
```

## 🧪 Testes

```bash
# Executar todos os testes
npm run test

# Testes específicos por workspace
npm run test --workspace=apps/api
npm run test --workspace=apps/ui

# Coverage
npm run test:cov --workspace=apps/api
npm run test:coverage --workspace=apps/ui
```

## 📦 Dependências Principais

### Backend
- `@nestjs/core` - Framework principal
- `typeorm` - ORM para PostgreSQL
- `class-validator` - Validação de dados
- `@nestjs/swagger` - Documentação automática

### Frontend
- `react` - Biblioteca principal
- `@chakra-ui/react` - Componentes UI
- `@reduxjs/toolkit` - Gerenciamento de estado
- `react-hook-form` - Formulários
- `chart.js` - Gráficos interativos
