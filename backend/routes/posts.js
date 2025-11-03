const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

// GET /posts - Lista todos os posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('usuario', 'username')
      .sort({ createdAt: -1 });
    
    res.json(posts);
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao buscar posts',
      message: error.message 
    });
  }
});

// GET /posts/:id - Obtém post por ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('usuario', 'username');
    
    if (!post) {
      return res.status(404).json({ 
        error: 'Post não encontrado' 
      });
    }
    
    res.json(post);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ 
        error: 'Post não encontrado' 
      });
    }
    res.status(500).json({ 
      error: 'Erro ao buscar post',
      message: error.message 
    });
  }
});

// POST /posts - Cria novo post
router.post('/', async (req, res) => {
  try {
    const { titulo, texto, usuario } = req.body;

    // Validação básica
    if (!titulo || !texto || !usuario) {
      return res.status(400).json({ 
        error: 'Título, texto e usuário são obrigatórios' 
      });
    }

    // Verificar se usuário existe
    const userExists = await User.findById(usuario);
    if (!userExists) {
      return res.status(404).json({ 
        error: 'Usuário não encontrado' 
      });
    }

    // Criar post
    const post = new Post({ titulo, texto, usuario });
    await post.save();
    
    // Buscar post com dados do usuário
    const populatedPost = await Post.findById(post._id)
      .populate('usuario', 'username');

    res.status(201).json(populatedPost);

  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        error: 'Erro de validação',
        messages 
      });
    }

    res.status(500).json({ 
      error: 'Erro ao criar post',
      message: error.message 
    });
  }
});

module.exports = router;
