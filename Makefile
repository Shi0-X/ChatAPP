# Makefile en la raíz del proyecto
lint-frontend:
	make -C frontend lint

install:
	npm ci
	cd frontend && npm ci

# Ajusta aquí tu comando de backend
start-backend:
	npx --no-install --package @hexlet/chat-server start-server --port 5001 --static ./frontend/build

start-frontend:
	make -C frontend start

start:
	make start-backend & make start-frontend

build:
	make -C frontend build
