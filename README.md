# Buzin Solutions

Site institucional da Buzin Solutions com frontend React e API Flask. O
frontend apresenta a marca, navegação e conteúdo localizado em português,
inglês e italiano. O backend publica uma API versionada e documentada no
ambiente de desenvolvimento.

## Tecnologias

- Node.js 24.18.1 LTS, npm 11.16.0, React 19 e TypeScript 6.
- Python 3.14.6, Poetry 2.4.1, Flask 3.1 e Gunicorn 26.
- Vite 8 no desenvolvimento e Caddy 2.11 em produção.
- Vitest, Testing Library, pytest e Playwright.

## Desenvolvimento

Crie a rede externa uma vez:

```sh
docker network create proxy-network
```

Copie `.env.example` para `.env` e execute:

```sh
docker compose -f docker-compose.yml up -d --build
```

Serviços padrão:

- frontend: `http://localhost:3004`
- backend: `http://localhost:8004/api/v1/health`
- Swagger: `http://localhost:8004/docs`

Os comandos de execução pertencem aos Dockerfiles. O Compose de
desenvolvimento apenas seleciona os targets `dev`.

## Produção

```sh
docker compose -f docker-compose-prod.yml up -d --build
```

Produção publica frontend em `3000` e backend em `8000` por padrão. O Caddy
serve a SPA e encaminha `/api/*` ao backend. Swagger fica desabilitado.

Na VPS, `.env` é um link simbólico para:

- `main`: `/root/projects/envs/buzin-solutions.env`
- `dev`: `/root/projects/envs/buzin-solutions-dev.env`

Os projetos Compose são `buzin-solutions` e `buzin-solutions-dev`.

## Qualidade

Frontend:

```sh
cd frontend
npm ci
npm run verify
npm run test:e2e
```

Backend:

```sh
cd backend
poetry install --with dev
poetry run python scripts/verify.py
```

As duas bases exigem lint, formatação, tipagem, build e 100% de cobertura de
linhas e branches. O E2E tenta `E2E_PLATFORM_COMMAND`; se ele não existir ou
falhar, executa o adapter Playwright.

## Entrega

`main` representa produção e `dev` desenvolvimento. Jenkins usa as etapas
`Install`, `Verify`, `Compose`, `Container` e `Deploy`. GitHub Actions valida
frontend, backend, E2E, Compose e imagens em pushes e pull requests.
