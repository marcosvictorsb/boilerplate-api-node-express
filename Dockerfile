FROM node:20-alpine

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de configuração do npm e instala as dependências
COPY package.json package-lock.json ./
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Compila o código TypeScript para a pasta dist
# RUN npm run build

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]

