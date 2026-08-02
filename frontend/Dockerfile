FROM node:24.18.1-bookworm-slim AS dependencies

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci


FROM dependencies AS dev

COPY . ./

EXPOSE 3004
CMD ["npm", "run", "dev"]


FROM dependencies AS build

ARG VITE_REACT_APP_LANGUAGE=pt-BR
ENV VITE_REACT_APP_LANGUAGE=$VITE_REACT_APP_LANGUAGE

COPY . ./
RUN npm run verify


FROM caddy:2.11.4-alpine AS prod

COPY --from=build /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 3000
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
