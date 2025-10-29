FROM node:18-alpine

# Install netcat for health checks
RUN apk add --no-cache netcat-openbsd

WORKDIR /app

# Install dependencies for development
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3001

# Start with migrations then dev mode
CMD ["sh", "-c", "until nc -z postgres 5432; do echo 'Waiting for postgres...'; sleep 2; done; echo 'PostgreSQL started'; npm run migration:run; npm run dev"]