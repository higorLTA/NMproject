// db.js: Instacia o mysql
const mysql = require('mysql2');

// Configuração do banco de dados
const connection = mysql.createConnection({
    host: process.env.DB_HOST,   
    user: process.env.DB_USER,
    database: process.env.DB_PASSWORD,
    password: process.env.DB_NAME,
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