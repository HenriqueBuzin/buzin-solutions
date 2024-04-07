FROM node:21-alpine3.19 as build-stage

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

RUN npm run build

FROM nginx:1.25.4-alpine3.18-slim

COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80
