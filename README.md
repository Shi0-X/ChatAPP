### Hexlet tests and linter status:
[![Actions Status](https://github.com/Shi0-X/fullstack-javascript-project-139/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Shi0-X/fullstack-javascript-project-139/actions) <a href="https://codeclimate.com/github/Shi0-X/ChatAPP/maintainability"><img src="https://api.codeclimate.com/v1/badges/2a21a3246eab2f086bda/maintainability" /></a>

# ChatAPP

Este proyecto es un chat en tiempo real basado en **React** (frontend) y el servidor de **Hexlet** (backend).  
A continuación se describen los pasos para ejecutarlo localmente (tanto en desarrollo como en producción), y el enlace al despliegue en **Railway**.

## Despliegue en Railway

La aplicación está desplegada en [Railway](https://railway.app/).  
Puedes acceder a la versión en producción aquí:  
[https://chatapp-production-b85f.up.railway.app/](https://chatapp-production-b85f.up.railway.app/)

---

## Uso en local

### 1. Clonar el repositorio
```bash
git clone https://github.com/Shi0-X/ChatAPP.git
cd ChatAPP
```
### 2. Instalar dependencias
En la raíz (donde está el package.json principal):

```bash
Copiar
npm install
```
Luego, en la carpeta frontend/ (donde está el package.json del frontend):
```bash
Copiar
cd frontend
npm install
cd ..
```
### Modo desarrollo (puerto 3000)
Si deseas desarrollar o modificar el código React con recarga en caliente:

En una terminal, inicia el servidor de desarrollo de Create React App:

```bash
cd frontend
npm start
Esto abrirá el frontend en http://localhost:3000.
```
(Opcional) En otra terminal, levanta el servidor de Hexlet para manejar las peticiones reales:

```bash
Copiar
npx start-server --port 5001
Corre en http://localhost:5001.
```
Tu frontend, corriendo en el puerto 3000, hará peticiones a http://localhost:5001/api/v1/... (ver api.js).
Si el servidor no está activo, las peticiones (login, canales, etc.) darán errores de red.

### Modo producción (puerto 5001)
Para ejecutar el frontend compilado y el backend en un solo puerto (5001):

Compila el frontend:

```bash
Copiar
cd frontend
npm run build
cd ..
```
Esto genera la carpeta build/ dentro de frontend/.

Inicia el servidor de Hexlet, sirviendo la carpeta estática ./frontend/build:

```bash
Copiar
npx start-server --port 5001 --static ./frontend/build
Abre http://localhost:5001 en tu navegador.
```
La aplicación React (modo producción) se servirá en ese puerto.
Las peticiones de login, canales, etc. se harán al mismo puerto 5001 (/api/v1/...). 
