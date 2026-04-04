-- ─── Init script — uruchamiany tylko przy pierwszym starcie kontenera ─────────
-- Charset i collation dla emoji + polskich znaków
ALTER DATABASE aniarozgotuje CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Uprawnienia dla appuser
GRANT ALL PRIVILEGES ON aniarozgotuje.* TO 'appuser'@'%';
FLUSH PRIVILEGES;
