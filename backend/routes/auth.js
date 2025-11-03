const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /auth - Criar usuário (cadastro)
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validação básica
    if (!username || !password) {
      return res.status(400).json({ 
        error: 'Nome de usuário e senha são obrigatórios' 
      });
    }

    // Verificar se usuário já existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ 
        error: 'Nome de usuário já existe' 
      });
    }

    // Criar novo usuário
    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ 
      message: 'Usuário criado com sucesso',
      user: {
        id: user._id,
        username: user.username
      }
    });

  } catch (error) {
    // Tratamento de erros de validação do Mongoose
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        error: 'Erro de validação',
        messages 
      });
    }

    res.status(500).json({ 
      error: 'Erro ao criar usuário',
      message: error.message 
    });
  }
});

module.exports = router;
