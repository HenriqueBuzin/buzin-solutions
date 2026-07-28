# Contrato de reconstrução

Este arquivo é a especificação técnica canônica da Buzin Solutions. Um agente
deve conseguir reconstruir a aplicação do zero usando apenas este contrato,
sem alterar o comportamento descrito. `README.md` é a documentação humana;
detalhes operacionais e decisões de implementação pertencem aqui.

## Produto e comportamento

A aplicação é um site institucional de uma página. A tela contém um fundo
animado de universo com sobreposição visual, cabeçalho com links para
`#portfolio` e `#contact`, logotipo da empresa, a frase "The sky is the limit"
localizada e uma âncora vazia `#portfolio` reservada para expansão. O título do
documento é sempre `Buzin Solutions`.

Idiomas suportados:

- `pt-BR`: Portfólio, Contato, O céu é o limite.
- `en-US`: Portfolio, Contact, The sky is the limit.
- `it`: Portafoglio, Contatto, Il cielo è il limite.

A variável de build `VITE_REACT_APP_LANGUAGE` tem precedência. Sem ela,
domínios `.com.br` usam `pt-BR`, `.it` usa `it`, `.com` e qualquer outro host
usam `en-US`.

## Arquitetura obrigatória

O monorepo possui apenas `frontend/` e `backend/` como aplicações.

O frontend é React 19.2.8, exclusivamente TypeScript estrito, empacotado por
Vite. Componentes são pequenos e separados em Background, Header, Main e
Portfolio. i18next concentra recursos e seleção de idioma. Não adicionar
arquivos JSX ou JavaScript de aplicação. Desenvolvimento roda Vite em `3004`;
produção gera arquivos estáticos servidos por Caddy em `3000`. Caddy responde
`/health`, encaminha `/api/*` para `backend:8000`, comprime respostas e aplica
fallback de SPA.

O backend é uma application factory Flask chamada `create_app`. A API usa
Flask-Smorest e prefixo `/api/v1`. `GET /api/v1/health` retorna HTTP 200:

```json
{
  "status": "ok",
  "service": "buzin-solutions-backend",
  "version": "1.0.0"
}
```

Com `SWAGGER_ENABLED=true`, `/openapi.json` e `/docs` devem responder. Sem essa
opção, ambos retornam 404. Rotas desconhecidas continuam 404. O servidor de
desenvolvimento é Flask em `8000`; produção usa Gunicorn com dois workers e
quatro threads.

Não há banco, Redis ou fila neste projeto. Não instalar serviços de dados no
Compose. Integrações futuras devem chegar por rede externa e variáveis de
ambiente.

## Versões e dependências

Fixar versões exatas e atualizar lockfiles no mesmo commit.

- Node.js 24.18.0 LTS e npm 11.16.0, bloqueados por `engines`,
  `packageManager`, `.nvmrc` e `engine-strict=true`.
- React/React DOM 19.2.8, TypeScript 6.0.3, Vite 8.1.5, Vitest 4.1.10 e
  Playwright 1.62.0.
- Python 3.14.6 e Poetry 2.4.1.
- Flask 3.1.3, Flask-Smorest 0.47.0, Marshmallow 4.3.0 e Gunicorn 26.0.0.
- Black 26.5.1, isort 8.0.1, Ruff 0.16.0, mypy 2.3.0, pytest 9.1.1 e
  pytest-cov 7.1.0.
- Caddy 2.11.4 Alpine somente na imagem final do frontend.

O frontend usa ESLint 10 com TypeScript ESLint e plugins de hooks/refresh. O
backend é gerenciado exclusivamente por Poetry; não criar requirements.txt.

## Testes e critérios de qualidade

Frontend:

- testes unitários cobrem resolução de idioma e recursos;
- integração cobre a página e todos os elementos observáveis;
- regressão cobre bootstrap com e sem elemento raiz;
- smoke/E2E abre a página em Chromium, valida título, logo, links e âncora;
- Vitest/V8 exige 100% em statements, branches, functions e lines;
- `npm run verify` executa lint, cobertura, typecheck e build.

`npm run test:e2e` chama `scripts/run-e2e.mjs`. Se
`E2E_PLATFORM_COMMAND` estiver definido, execute-o primeiro. Resultado zero
encerra com sucesso; ausência ou falha deve acionar Playwright como fallback.

Backend:

- testes unitários cobrem interpretação de flags;
- integração cobre health, OpenAPI e Swagger;
- regressão cobre documentação desabilitada e rotas inexistentes;
- pytest-cov exige 100% de linhas e branches;
- `scripts/verify.py` executa Black check, isort check, Ruff, mypy estrito e
  pytest, interrompendo na primeira falha.

Nenhum gate pode ser reduzido ou excluído para obter aprovação.

## Docker e Compose

Existem exatamente dois Compose, sem campo `version` e sem profiles:

- `docker-compose.yml`: projeto `buzin-solutions-dev`, targets `dev`;
- `docker-compose-prod.yml`: projeto `buzin-solutions`, targets `prod`.

Os serviços chamam-se exatamente `frontend` e `backend`. Comandos `CMD`
pertencem aos respectivos Dockerfiles, nunca ao Compose. Ambos os serviços
usam `restart: unless-stopped`, `init`, graceful stop, `no-new-privileges`,
healthcheck, labels `infra.*`, logs JSON rotacionados e a rede externa
configurada por `PROXY_NETWORK`, padrão `proxy-network`.

Dev publica frontend `3004` e backend `8004`, monta o código e habilita
Swagger. Produção publica `3000` e `8000`, não monta código e desabilita
Swagger. Nomes de imagens são `buzin-solutions/{frontend|backend}:TAG`, com
sufixo `-dev` apenas em desenvolvimento.

Variáveis aceitas: `ENV`, `VITE_REACT_APP_LANGUAGE`, `FRONTEND_PORT`,
`BACKEND_PORT`, `PROXY_NETWORK`, `IMAGE_TAG` e `E2E_PLATFORM_COMMAND`.
Segredos não entram no Git. Na VPS, `.env` deve ser link simbólico para o
arquivo centralizado do ambiente.

## CI/CD e branches

Branches canônicas são `main` e `dev` e devem permanecer com a mesma árvore
quando uma padronização for promovida às duas. `main` usa produção; `dev` usa
desenvolvimento.

Jenkins contém exatamente as etapas `Install`, `Verify`, `Compose`,
`Container` e `Deploy`. Ele valida os dois códigos em targets isolados, valida
o Compose correspondente, cria imagens versionadas pelo SHA, copia o workspace
sem `.git`, cria o link `.env`, sobe com `--no-build --pull never
--remove-orphans --wait` e executa E2E após o deploy. Não usar rsync nem clone
sem autenticação.

GitHub Actions roda em `main` e `dev`, usa ações fixadas por SHA, Node/npm
exatos, `npm ci`, todos os gates, Playwright, valida os dois Compose e constrói
as imagens finais. Permissões são somente leitura e execuções concorrentes da
mesma referência são canceladas.

## Critério final de reconstrução

A reconstrução está correta quando os lockfiles são reproduzíveis, nenhuma
dependência tem vulnerabilidade conhecida no audit, frontend e backend passam
todos os gates em ambiente limpo, ambos os Compose validam, os containers ficam
saudáveis, Swagger existe apenas em dev, Caddy serve a SPA e encaminha a API,
E2E passa pela plataforma ou pelo fallback Playwright e `main`/`dev` possuem a
mesma árvore.
