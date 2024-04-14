#!/bin/sh

obtain_or_renew_certificates() {
    echo "Verificando e obtendo certificados Let's Encrypt para produção..."
    for domain in buzinsolutions.com buzinsolutions.com.br; do
        if [ ! -f "/etc/letsencrypt/live/$domain/fullchain.pem" ]; then
            certbot certonly --nginx --non-interactive --agree-tos --email henrique.buzin@buzinsolutions.com -d $domain --keep-until-expiring
        fi
    done
    echo "Renovação automática de certificados configurada."
}

if [ "$ENV" = "production" ]; then
    echo "Ambiente de produção detectado. Configurando nginx para HTTPS..."
    cp /etc/nginx/nginx.conf.production /etc/nginx/nginx.conf
    obtain_or_renew_certificates
else
    echo "Ambiente de desenvolvimento detectado. Configurando nginx para HTTP..."
    cp /etc/nginx/nginx.conf.develop /etc/nginx/nginx.conf
fi

nginx -g 'daemon off;'
