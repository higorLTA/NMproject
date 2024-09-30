// db.js: Instacia o mysql
const mysql = require('mysql2');

// Configuração do banco de dados
const connection = mysql.createConnection({
    host: 'localhost',   
    user: 'root',
    database: 'teste',
    password: 'root',
});

// Conexão com o banco de dados
connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
        return;
    }
    console.log('Conectado ao banco de dados com sucesso!');
});

module.exports = connection;
