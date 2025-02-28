# Usa una imagen oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias (raíz)
COPY package.json package-lock.json ./

# Copia los archivos de dependencias (frontend)
COPY frontend/package.json frontend/package-lock.json ./frontend/

# Instala dependencias en la raíz y en frontend
RUN npm install && cd frontend && npm install

# Copia el resto del código después de instalar dependencias
COPY . .

# Construye el frontend (Create React App) dentro de "frontend/"
RUN cd frontend && npm run build

# Copia la carpeta de build a la raíz, quedando en /app/build
RUN cp -R ./frontend/build ./build

# Expone el puerto en el que correrá la aplicación
EXPOSE 5001

# Comando de inicio del servidor que sirve /app/build
CMD ["npx", "start-server", "./build"]

