# Especifique a imagem base
FROM node:alpine

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie os arquivos do projeto para o container
COPY package*.json ./
COPY index.js .

# Instale as dependências do projeto (se houver)
RUN npm install

# Informe a porta que o container deve expor
EXPOSE 3000

# Defina o comando para executar o aplicativo
CMD [ "node", "index.js" ]
