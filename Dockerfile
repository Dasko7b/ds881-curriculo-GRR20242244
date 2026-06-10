FROM node:20-alpine

WORKDIR /app

# Copia arquivos de configuração das dependências
COPY package*.json ./

# Instala as dependências de desenvolvimento e produção
RUN npm install

# Copia o restante do código fonte
COPY . .

# Explicita a porta de desenvolvimento
EXPOSE 8080

# Inicia o servidor de desenvolvimento do Vite
CMD ["npm", "run", "dev"]
