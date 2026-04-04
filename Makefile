# ─── Ania Rozgotuje — Dev Commands ────────────────────────────────────────────
.PHONY: up down build bash composer migrate fixtures jwt-keys logs db

## Uruchom wszystkie kontenery
up:
	docker compose up -d --build

## Zatrzymaj kontenery
down:
	docker compose down

## Rebuild bez cache
build:
	docker compose build --no-cache

## Wejdź do kontenera PHP
bash:
	docker compose exec php bash

## Uruchom composer install
install:
	docker compose exec php composer install

## Uruchom migracje
migrate:
	docker compose exec php php bin/console doctrine:migrations:migrate --no-interaction

## Stwórz migrację ze zmian encji
diff:
	docker compose exec php php bin/console doctrine:migrations:diff

## Załaduj fixtures (dane testowe)
fixtures:
	docker compose exec php php bin/console doctrine:fixtures:load --no-interaction

## Wygeneruj klucze JWT
jwt-keys:
	docker compose exec php mkdir -p config/jwt
	docker compose exec php openssl genrsa -out config/jwt/private.pem -aes256 -passout env:JWT_PASSPHRASE 4096
	docker compose exec php openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem -passin env:JWT_PASSPHRASE

## Logi PHP
logs:
	docker compose logs -f php

## Logi Nginx
logs-nginx:
	docker compose logs -f nginx

## Status kontenerów
status:
	docker compose ps

## Wyczyść cache Symfony
cache-clear:
	docker compose exec php php bin/console cache:clear

## Konsola Symfony
console:
	docker compose exec php php bin/console $(cmd)

## Baza danych — drop + create + migrate + fixtures
db-reset:
	docker compose exec php php bin/console doctrine:database:drop --force --if-exists
	docker compose exec php php bin/console doctrine:database:create
	docker compose exec php php bin/console doctrine:migrations:migrate --no-interaction
	docker compose exec php php bin/console doctrine:fixtures:load --no-interaction

## Stwórz użytkownika moderatora
create-user:
	docker compose exec php php bin/console app:create-user

help:
	@grep -E '^[a-zA-Z_-]+:.*?##' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
