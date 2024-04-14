FROM node:21-alpine3.19 as build-stage
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

FROM nginx:1.25.4-alpine3.18-slim
RUN apk add --no-cache openssl certbot certbot-nginx

# Prepara diretórios para certificados
RUN mkdir -p /etc/nginx/certs /var/www/html

COPY --from=build-stage /app/build /usr/share/nginx/html

COPY nginx/options-ssl-nginx.conf /etc/letsencrypt/options-ssl-nginx.conf

COPY nginx/nginx.conf.production /etc/nginx/nginx.conf.production

COPY nginx/nginx.conf.develop /etc/nginx/nginx.conf.develop

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

EXPOSE 80 443

ENTRYPOINT ["/entrypoint.sh"]
