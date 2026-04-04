# Local Setup — Ania Rozgotuje API

## Wymagania

- Docker Desktop (lub Docker Engine + Compose v2)
- make (opcjonalnie — dla wygody)

## Pierwsze uruchomienie

```bash
# 1. Sklonuj repo
git clone https://github.com/Daemon-Penguins/aniarozgotuje.pl
cd aniarozgotuje.pl

# 2. Uruchom kontenery
make up
# lub: docker compose up -d --build

# 3. Zainstaluj zależności PHP
make install
# lub: docker compose exec php composer install

# 4. Wygeneruj klucze JWT
make jwt-keys
# lub ręcznie:
# docker compose exec php openssl genrsa -out config/jwt/private.pem -aes256 4096
# docker compose exec php openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem

# 5. Uruchom migracje
make migrate

# 6. (Opcjonalnie) Załaduj dane testowe
make fixtures
```

## Adresy

| Serwis       | URL                          |
|-------------|------------------------------|
| API          | http://localhost:8080/api    |
| phpMyAdmin   | http://localhost:8081        |
| Mailpit      | http://localhost:8025        |
| MySQL        | localhost:3307               |

## Debugowanie z Xdebug

### PhpStorm
1. `Settings → PHP → Servers` → dodaj serwer:
   - Name: `aniarozgotuje`
   - Host: `localhost`
   - Port: `8080`
   - Debugger: Xdebug
   - Zaznacz "Use path mappings": `/var/www/api` → ścieżka lokalna `api/`
2. `Run → Start Listening for PHP Debug Connections`
3. Postaw breakpoint i odpal request

### VS Code
Zainstaluj PHP Debug (Xdebug), dodaj do `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Listen for Xdebug",
      "type": "php",
      "request": "launch",
      "port": 9003,
      "pathMappings": {
        "/var/www/api": "${workspaceFolder}/api"
      }
    }
  ]
}
```

## Endpointy API

### Auth
```
POST /api/auth/login       # { email, password } → { token }
GET  /api/auth/me          # wymaga JWT Bearer
```

### Reviews (przepisy)
```
GET  /api/reviews          # lista opublikowanych (paginacja: ?page=1&limit=12)
GET  /api/reviews/{slug}   # szczegóły przepisu
POST /api/reviews          # wymaga ROLE_MODERATOR + JWT
PUT  /api/reviews/{id}     # wymaga ROLE_MODERATOR + JWT
DELETE /api/reviews/{id}   # wymaga ROLE_ADMIN + JWT
```

### Przykład login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "anna@aniarozgotuje.pl", "password": "haslo"}'
```

## Stack

| Warstwa | Technologia |
|---------|------------|
| Framework | Symfony 7.x |
| ORM | Doctrine ORM 3 |
| Baza danych | MySQL 8.0 |
| Auth | JWT (LexikJWTAuthenticationBundle) |
| PHP | 8.3-fpm |
| Web server | Nginx 1.25 |
| Debugger | Xdebug 3 (port 9003) |
| DB UI | phpMyAdmin |
| Mailer | Mailpit |
