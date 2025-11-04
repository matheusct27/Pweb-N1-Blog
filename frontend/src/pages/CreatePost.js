import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postsService } from '../services/api';
import './CreatePost.css';

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',
    texto: '',
    usuario: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação 
    if (!formData.titulo || !formData.texto || !formData.usuario) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await postsService.create(formData.titulo, formData.texto, formData.usuario);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1 className="page-title">Criar Novo Post</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="usuario">ID do Usuário:</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              placeholder="Cole o ID do seu usuário"
              required
            />
            <small className="form-hint">
              Você precisa estar cadastrado. Copie seu ID da página de cadastro.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="titulo">Título:</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Digite o título do post"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="texto">Texto:</label>
            <textarea
              id="texto"
              name="texto"
              value={formData.texto}
              onChange={handleChange}
              placeholder="Escreva o conteúdo do seu post..."
              rows="10"
              required
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Criando...' : 'Criar Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
