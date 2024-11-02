docker run --name crypto-api \
 -e RABBITMQ_QUEUE=candles \
 -e RABBITMQ_SERVER=amqp://guest:guest@192.168.0.103:5672 \
 -e SOCKET_EVENT_NAME=newCandle \
 -e SOCKET_CLIENT_URL=http://localhost:8080 \
 -e MONGODB_URL=mongodb://root:root@192.168.0.103:27017 \
 -p 3001:3000 \
 -d fclebinho/cryptocoin-api:latest
