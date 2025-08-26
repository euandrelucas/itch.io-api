# -------------------------------
# Etapa 1: Build
# -------------------------------
FROM node:20-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar apenas arquivos essenciais primeiro (cache melhor para dependências)
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o resto do código
COPY . .

# Gerar build da aplicação
RUN npm run build

# -------------------------------
# Etapa 2: Runtime
# -------------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Copiar apenas os arquivos necessários do builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Definir variáveis padrão (pode sobrescrever no docker-compose ou servidor)
ENV NODE_ENV=production
ENV PORT=3000

# Expor a porta do NestJS
EXPOSE 3000

# Rodar a aplicação
CMD ["node", "dist/main"]
