// server.js
const express = require('express');
const http = require('http');
require('dotenv').config();
const homeRoutes = require('./routes/homeRoutes.js');
const setupWebSocket = require('./Controllers/WebsocketController.js');

// Inicializando o Express
const app = express();

// Configurando as rotas
app.use('/', homeRoutes);

// Servindo arquivos estáticos
app.use(express.static('public'));

// Criando o servidor HTTP
const server = http.createServer(app);

// Configurando o WebSocket
setupWebSocket(server);

// Iniciando o servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
