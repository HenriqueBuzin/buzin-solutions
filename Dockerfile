# ===== DEV =====
FROM node:21-alpine3.19 as dev

WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ .

CMD ["npm", "run", "dev", "--", "--host"]

# ===== BUILD =====
FROM node:21-alpine3.19 as build

WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ .
RUN npm run build

# ===== PROD =====
FROM nginx:1.25-alpine as prod

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
