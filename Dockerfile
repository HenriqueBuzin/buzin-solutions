FROM node:21-alpine3.19

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

CMD ["npm", "start"]
