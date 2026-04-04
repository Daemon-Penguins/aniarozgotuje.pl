# GitHub Secrets — konfiguracja dla CI/CD

Ustaw w: `GitHub → Daemon-Penguins/aniarozgotuje.pl → Settings → Secrets and variables → Actions`

## Repository Secrets (wspólne dla obu środowisk)

| Secret | Opis | Przykład |
|--------|------|---------|
| `FTP_SERVER` | Adres serwera FTP | `ftp.aniarozgotuje.pl` |
| `FTP_USERNAME` | Login FTP | `user@aniarozgotuje.pl` |
| `FTP_PASSWORD` | Hasło FTP | `twoje_haslo_ftp` |
| `FTP_DIR_PROD` | Katalog na produkcji | `/public_html/` |
| `FTP_DIR_PREVIEW` | Katalog na preview | `/public_html/preview/` |

## Environment Secrets — `production` (branch: master)

| Secret | Opis |
|--------|------|
| `APP_SECRET` | Symfony APP_SECRET (min. 32 znaki random) |
| `DATABASE_URL` | `mysql://user:pass@host/dbname?serverVersion=8.0&charset=utf8mb4` |
| `JWT_PASSPHRASE` | Hasło do klucza JWT |

## Environment Secrets — `preview` (branch: develop)

Tak samo jak `production`, ale z danymi do bazy preview.

## Jak ustawić przez gh CLI

```bash
# Repository secrets (FTP — wspólne)
gh secret set FTP_SERVER      --repo Daemon-Penguins/aniarozgotuje.pl
gh secret set FTP_USERNAME    --repo Daemon-Penguins/aniarozgotuje.pl
gh secret set FTP_PASSWORD    --repo Daemon-Penguins/aniarozgotuje.pl
gh secret set FTP_DIR_PROD    --repo Daemon-Penguins/aniarozgotuje.pl
gh secret set FTP_DIR_PREVIEW --repo Daemon-Penguins/aniarozgotuje.pl

# Environment secrets
gh secret set APP_SECRET     --repo Daemon-Penguins/aniarozgotuje.pl --env production
gh secret set DATABASE_URL   --repo Daemon-Penguins/aniarozgotuje.pl --env production
gh secret set JWT_PASSPHRASE --repo Daemon-Penguins/aniarozgotuje.pl --env production

gh secret set APP_SECRET     --repo Daemon-Penguins/aniarozgotuje.pl --env preview
gh secret set DATABASE_URL   --repo Daemon-Penguins/aniarozgotuje.pl --env preview
gh secret set JWT_PASSPHRASE --repo Daemon-Penguins/aniarozgotuje.pl --env preview
```

## Struktura katalogów na hostingu

```
hosting root/
├── public_html/                ← FTP_DIR_PROD → aniarozgotuje.pl
│   ├── index.html              ← Next.js static export
│   ├── _next/                  ← assets
│   ├── .htaccess               ← SPA fallback + cache headers
│   └── api/                    ← Symfony 7
│       ├── index.php
│       ├── src/
│       ├── vendor/
│       ├── config/
│       ├── .env
│       └── .htaccess
│
└── preview/                    ← FTP_DIR_PREVIEW → preview.aniarozgotuje.pl
    ├── index.html
    ├── _next/
    ├── .htaccess
    └── api/
        └── ...
```

## JWT klucze na hostingu

Po pierwszym deployu wygeneruj klucze JWT na serwerze przez SSH lub panel hostingu:

```bash
cd public_html/api
openssl genrsa -out config/jwt/private.pem -aes256 4096
openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem
```

Lub wgraj gotowe klucze przez FTP (nie commituj do repo!).
