const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

// GET /comments/:postId - Lista comentários do post
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate('userId', 'username')
      .sort({ createdAt: 1 });
    
    res.json(comments);
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao buscar comentários',
      message: error.message 
    });
  }
});

// POST /comments - Cria comentário
router.post('/', async (req, res) => {
  try {
    const { texto, postId, userId } = req.body;

    // Validação básica
    if (!texto || !postId || !userId) {
      return res.status(400).json({ 
        error: 'Texto, postId e userId são obrigatórios' 
      });
    }

    // Verificar se post existe
    const postExists = await Post.findById(postId);
    if (!postExists) {
      return res.status(404).json({ 
        error: 'Post não encontrado' 
      });
    }

    // Verificar se usuário existe
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ 
        error: 'Usuário não encontrado' 
      });
    }

    // Criar comentário
    const comment = new Comment({ texto, postId, userId });
    await comment.save();
    
    // Buscar comentário com dados do usuário
    const populatedComment = await Comment.findById(comment._id)
      .populate('userId', 'username');

    res.status(201).json(populatedComment);

  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        error: 'Erro de validação',
        messages 
      });
    }

    res.status(500).json({ 
      error: 'Erro ao criar comentário',
      message: error.message 
    });
  }
});

module.exports = router;
