#!/bin/sh

# Função para obter ou renovar certificados Let's Encrypt
obtain_or_renew_certificates() {
    echo "Verificando e obtendo certificados Let's Encrypt para produção..."
    for domain in buzinsolutions.com buzinsolutions.com.br; do
        if [ ! -f "/etc/letsencrypt/live/$domain/fullchain.pem" ]; then
            certbot certonly --nginx --non-interactive --agree-tos --email henrique.buzin@buzinsolutions.com -d $domain --keep-until-expiring
        fi
    done
    echo "Renovação automática de certificados configurada."
}

# Seleciona o arquivo de configuração do Nginx apropriado com base no ambiente
if [ "$ENV" = "production" ]; then
    echo "Ambiente de produção detectado. Configurando nginx para HTTPS..."
    cp /etc/nginx/nginx.conf.production /etc/nginx/nginx.conf
    obtain_or_renew_certificates
else
    echo "Ambiente de desenvolvimento detectado. Configurando nginx para HTTP..."
    cp /etc/nginx/nginx.conf.develop /etc/nginx/nginx.conf
fi

# Executa o nginx em primeiro plano
nginx -g 'daemon off;'
