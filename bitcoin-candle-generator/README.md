docker run --name crypto-generator \
 -e RABBITMQ_QUEUE="candles" \
 -e RABBITMQ_SERVER="amqp://guest:guest@192.168.0.103:5672" \
 -e COINGECKO_API_URL="https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd" \
 -p 3002:3000 \
 -d fclebinho/cryptocoin-generator:latest
