FROM php:8.3-fpm-alpine

# System deps
RUN apk add --no-cache \
    bash \
    git \
    curl \
    unzip \
    icu-dev \
    libzip-dev \
    oniguruma-dev \
    linux-headers \
    $PHPIZE_DEPS

# PHP extensions
RUN docker-php-ext-install \
    pdo_mysql \
    intl \
    zip \
    opcache \
    bcmath \
    mbstring

# Xdebug (wyłączony domyślnie — włącza się przez xdebug.ini)
RUN pecl install xdebug && docker-php-ext-enable xdebug

# Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# PHP config
COPY php.ini /usr/local/etc/php/conf.d/app.ini

WORKDIR /var/www/api

# Uprawnienia
RUN addgroup -g 1000 www && adduser -u 1000 -G www -s /bin/sh -D www
USER www

EXPOSE 9000
CMD ["php-fpm"]
