import Fastify from 'fastify';
import fastifyWebsocket from '@fastify/websocket';

const host = '127.0.0.1';
const port = 5001;

const app = Fastify({ maxParamLength: 5000 });

app.register(fastifyWebsocket);
app.register(async fastify => {
  fastify.websocketServer.on('connection', socket => {
    socket.on('message', data => {
      socket.send('ok');
    });
  });
  fastify.get('/test', { websocket: true }, () => {});
});

app.listen({ host, port });

console.log(`Server running on ${host}:${port}`);
