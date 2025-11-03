const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'Título é obrigatório'],
    trim: true,
    minlength: [3, 'Título deve ter pelo menos 3 caracteres']
  },
  texto: {
    type: String,
    required: [true, 'Texto é obrigatório'],
    minlength: [10, 'Texto deve ter pelo menos 10 caracteres']
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
