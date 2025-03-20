# Makefile en la raíz del proyecto
lint-frontend:
    make -C frontend lint

install:
    npm ci
    cd frontend && npm ci

# Ajusta aquí tu comando de backend
start-backend:
    npx start-server -s ./dist -p 5001

start-frontend:
    make -C frontend start-frontend

start:
    make -C frontend start
build:
    make -C frontend build
