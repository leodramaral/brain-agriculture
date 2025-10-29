-- Inicialização do banco de dados Brain Agriculture
-- Este script será executado automaticamente quando o container PostgreSQL for criado

\echo 'Inicializando banco de dados Brain Agriculture...'

-- Criar extensões úteis
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\echo 'Banco de dados Brain Agriculture inicializado com sucesso!'