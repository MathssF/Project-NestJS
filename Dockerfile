# Use a imagem base do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos do projeto para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Executar o build
RUN npm run build

# Exponha a porta que a aplicação NestJS usa (por padrão é 3000)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
