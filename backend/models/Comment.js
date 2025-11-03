const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  texto: {
    type: String,
    required: [true, 'Texto do comentário é obrigatório'],
    trim: true,
    minlength: [1, 'Comentário não pode estar vazio']
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);
