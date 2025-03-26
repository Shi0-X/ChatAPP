FROM node:18-alpine

WORKDIR /app

# Copiamos package.json de raíz y frontend
COPY package.json package-lock.json ./
COPY frontend/package.json frontend/package-lock.json ./frontend/

RUN npm ci && cd frontend && npm ci

COPY . .

# Construimos React en frontend => genera carpeta "dist"
RUN cd frontend && npm run build

# OPCIONAL: si quieres copiar la carpeta dist a /app/dist
RUN cp -R ./frontend/dist ./dist

EXPOSE 5001

# Comando de inicio apuntando a dist
CMD ["npx", "start-server", "-s", "./frontend/dist", "-p", "5001"]
