install:
	npm ci

start:
	npm run start

build:
	node -e "require('fs').rmSync('../dist', { recursive: true, force: true })"
	npm run build

lint:
	npx eslint .

start-frontend:
	npx start-server -s ./dist