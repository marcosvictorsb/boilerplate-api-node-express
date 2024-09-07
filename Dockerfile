FROM node:20-alpine

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de configuração do npm e instala as dependências
COPY package.json ./
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Expõe as portas 3001
EXPOSE 3003

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
