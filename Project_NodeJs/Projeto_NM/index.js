const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const db = require('./db.js'); // Importa a conexão com o banco de dados
const session = require("express-session")
const jwt = require('jsonwebtoken');


//Cria um servidor web socket
const wss = new WebSocket.Server({ server })

//Funsão para verificar o token
function verificaToken(token){
  try{
    //Verifica o token usando a chave secreta 
    return jwt.verify(token, '12345')
  }catch (err){
    console.log('token invalido', err + token)
    return null //retorna nulo se o token for invalido 
  }
}

//Acontece quando o cliente tenta se conectar 
wss.on('connection', (ws, req) => {
  //verifica se o cliente enviou o token 
  const token = req.url.split('token')[1]

  const user = verificaToken(token)

  if(!user){
    ws.close()
    return
  }
    //Se o token for valido a conexão continua 
  console,log('Usuario autenticado:', user )

  //Recebe mensagens do cliente 
  ws.on('message', (message) => {
    console.log('messagem recebida do cliente:', message)
    ws.send('Menssagem recebida:' + message) //Envia uma resposta 
  })

  ws.on('close', () => {
    console.log('Conexão fechada')
  })
})

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Inicializar servidor HTTP e WebSocket
const server = require('http').createServer(app);
/* const wss = new WebSocket.Server({ server }); */

// In-memory "banco de dados"
let items = [];



//Metodo para criar 
app.post('/items', (req, res) => {
  const { login, senha } = req.body;
  const query = 'INSERT INTO items (login, senha) VALUES (?, ?)';
  
  db.query(query, [login, senha], (err, results) => {
    if (err) {
      console.error('Erro ao criar item:', err);
      res.status(500).send('Erro ao criar item');
      return;
    }
    
    const newItem = { id: results.insertId, login, senha };
    res.status(201).json(newItem);
  });
});

//Metodo para Listar
app.get('/items', (req, res) => {
  const query = 'SELECT * FROM items';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao obter itens:', err);
      res.status(500).send('Erro ao obter itens');
      return;
    }
    
    res.json(results);
  });
});

//Metodo para atualizar
app.put('/items/:id', (req, res) => {
  const id = req.params.id; 
  const {login, senha} = req.body;
  const query = 'UPDATE items SET login = ?, senha = ? WHERE id = ?';

  db.query(query, [login, senha, id], (err, results) => {
    if (err) {
      console.error('Erro ao atualizar item:', err);
      res.status(500).send('Erro ao atualizar item');
      return;
    }
    
    res.json({ id, login, senha });
  });
}); 

//Metodo Deletar 
app.delete('/items/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM items WHERE id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao deletar item:', err);
      res.status(500).send('Erro ao deletar item');
      return;
    }
    
    res.status(204).end(); // Envia uma resposta sem conteúdo
  });
});


// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.css'));
});



// Iniciar o servidor
server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});