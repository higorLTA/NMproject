// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para obter dados de um usuário
router.get('/:id', userController.getUserById);

// Rota para criar um novo usuário
router.post('/register', userController.createUser);

module.exports = router;
