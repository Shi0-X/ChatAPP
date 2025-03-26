# Usa una imagen oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias (raíz)
COPY package.json package-lock.json ./

# Copia los archivos de dependencias (frontend)
COPY frontend/package.json frontend/package-lock.json ./frontend/

# Instala dependencias en la raíz y en frontend
RUN npm ci && cd frontend && npm ci

# Copia el resto del código después de instalar dependencias
COPY . .

# Construye el frontend (Create React App) dentro de "frontend/",
# configurado para que el resultado vaya a "../dist"
RUN cd frontend && npm run build

# Copia la carpeta dist a /app/dist
# (asumiendo que tu build está configurado para generarse en "frontend/dist")
RUN cp -R ./frontend/dist ./dist

# Expone el puerto en el que correrá la aplicación
EXPOSE 5001

# Instala "serve" para servir la carpeta dist con fallback de rutas
RUN npm install --location=global serve

# Comando de inicio del servidor que sirve /app/dist en el puerto 5001
CMD ["serve", "-s", "dist", "-l", "5001"]
