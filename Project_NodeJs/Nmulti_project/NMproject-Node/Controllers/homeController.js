// Servir arquivos estáticos da pasta "public"
const path = require('path');

exports.getHomePage = (req, res) => {
  res.sendFile(path.join(__dirname, '../Public/index.html'));
};