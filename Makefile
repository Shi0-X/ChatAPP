lint-frontend:
	make -C frontend lint

install:
	npm ci
	cd frontend && npm ci

start-backend:
	npx start-server -s ./frontend/dist -p 5001

start-frontend:
	make -C frontend start-frontend

start:
	make -C frontend start-frontend

build:
	make -C frontend build