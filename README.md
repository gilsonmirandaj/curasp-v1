# CuraSP

CuraSP agora está estruturado como um MVP real de **Next.js + Vercel + Supabase**, com **fallback local** para funcionar mesmo sem variáveis de ambiente configuradas.

## Stack
- Next.js 14
- Route Handlers (`/api/*`)
- Supabase Postgres
- Vercel para deploy

## Como rodar
```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Variáveis de ambiente
Copie `.env.example` para `.env.local`.

```bash
cp .env.example .env.local
```

Preencha:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (opcional no começo)

## Fallback local
Se o Supabase não estiver configurado, o projeto usa `events.json` como fonte de dados local.

## Endpoints
- `GET /api/events`
- `GET /api/venues`
- `GET /api/genres`

Filtros suportados em `/api/events`:
- `q`
- `venue`
- `genre`
- `period=today|week|upcoming|all`
- `freeOnly=true`

## Banco
O schema inicial está em `supabase/schema.sql`.

## Deploy na Vercel
1. Importar o repositório na Vercel
2. Configurar as variáveis de ambiente
3. Deploy

## Próximos passos
- CRUD admin de eventos
- ingestão automática por fonte
- deduplicação
- favoritos/alertas
