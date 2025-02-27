# Usa una imagen oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias y los instala antes de copiar el código
COPY package.json package-lock.json ./
COPY frontend/package.json frontend/package-lock.json ./frontend/

# Instala dependencias en la raíz y en frontend
RUN npm install && cd frontend && npm install

# Copia todo el código después de instalar dependencias (para aprovechar el caché de Docker)
COPY . .

# Construye el frontend
RUN cd frontend && npm run build

# Expone el puerto en el que correrá la aplicación
EXPOSE 5001

# Comando de inicio del backend sirviendo el frontend
CMD ["npx", "start-server", "./frontend/build"]
