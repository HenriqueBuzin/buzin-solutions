#!/bin/sh

obtain_or_renew_certificates() {
    echo "Verificando e obtendo certificados Let's Encrypt para produção..."
    for domain in buzinsolutions.com buzinsolutions.com.br buzinsolutions.it; do
        if [ ! -f "/etc/letsencrypt/live/$domain/fullchain.pem" ]; then
            certbot certonly --nginx --non-interactive --agree-tos --email henrique.buzin@buzinsolutions.com -d $domain --keep-until-expiring
        else
            echo "Certificados existentes para $domain. Verificação para renovação..."
            certbot renew --nginx --non-interactive --agree-tos
        fi
    done
    echo "Configuração inicial dos certificados completa."
}

if [ "$ENV" = "production" ]; then
    echo "Ambiente de produção detectado. Configurando nginx para HTTPS..."
    cp /etc/nginx/nginx.conf.production /etc/nginx/nginx.conf
    obtain_or_renew_certificates
else
    echo "Ambiente de desenvolvimento detectado. Configurando nginx para HTTP..."
    cp /etc/nginx/nginx.conf.develop /etc/nginx/nginx.conf
fi

# Executa o nginx em primeiro plano
nginx -g 'daemon off;' &

# Loop de renovação
while :; do
    echo "Aguardando o próximo ciclo de renovação..."
    sleep 12h
    echo "Verificando a necessidade de renovação de certificados..."
    certbot renew --nginx
    nginx -s reload
done
