const db = require('../config/database')

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