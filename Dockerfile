# Use a imagem base do Node.js
FROM node:14

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos do projeto para o diretório de trabalho
COPY . .

# Instale as dependências do projeto
RUN npm install

# Exponha a porta que a aplicação NestJS usa (por padrão é 3000)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
