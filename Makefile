lint-frontend:
	make -C frontend lint

install:
	npm ci
	cd frontend && npm ci

start-backend:
	npx start-server -p 5001 -s ./dist

start-frontend:
	make -C frontend start-frontend

start:
	make -C frontend start

build:
	make -C frontend build
