const WebSocket = require('ws');
require('dotenv').config();

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });


  wss.on('connection', (ws, req) => {
    // Pegando o token da URL

    /* const token = req.url.split('token=')[1];
    console.log(token) */

    /* // Verificar se o token é válido
    if (token != '12345') {
      ws.close(1008, 'Token inválido');
      console.log('ERROOOOO')
      return;
    } */


    // O WebSocket está conectado com o token correto
    ws.send('Conectado com sucesso!');
    
    ws.on('message', (message) => {
      console.log(`Mensagem recebida: ${message}`);
    });
  });

  console.log('Servidor WebSocket configurado');
}

module.exports = setupWebSocket;
