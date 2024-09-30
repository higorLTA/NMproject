// app.js
const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const homeRoutes = require('./routes/homeRoutes');
const userRoutes = require('./routes/userRoutes');
const setupWebSocket = require('./Controllers/WebsocketController');
const connectDB = require('./config/database');

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

// Cria a aplicação Express
const app = express();

// Cria um servidor HTTP que o WebSocket também usará
const server = http.createServer(app);

// Conecta ao banco de dados
connectDB();

// Middleware básico
app.use(express.json()); // Permite receber JSON no body das requisições

// Definir rotas
app.use('/', homeRoutes);      // Rotas para a página inicial
app.use('/users', userRoutes); // Rotas para usuários

// Configura o WebSocket
setupWebSocket(server);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
