import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { postsService, commentsService } from '../services/api';
import CommentItem from '../components/CommentItem';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [commentForm, setCommentForm] = useState({
    texto: '',
    userId: ''
  });
  const [commentError, setCommentError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadPostAndComments();
  }, [id]);

  const loadPostAndComments = async () => {
    try {
      setLoading(true);
      const [postData, commentsData] = await Promise.all([
        postsService.getById(id),
        commentsService.getByPostId(id)
      ]);
      setPost(postData);
      setComments(commentsData);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!commentForm.texto || !commentForm.userId) {
      setCommentError('Texto e ID do usuário são obrigatórios');
      return;
    }

    try {
      setSubmitting(true);
      setCommentError('');
      await commentsService.create(commentForm.texto, id, commentForm.userId);
      setCommentForm({ texto: '', userId: '' });
      // Recarregar comentários
      const commentsData = await commentsService.getByPostId(id);
      setComments(commentsData);
    } catch (err) {
      setCommentError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Carregando post...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">{error}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container">
        <div className="error">Post não encontrado</div>
      </div>
    );
  }

  return (
    <div className="container">
      <article className="post-detail">
        <h1 className="post-detail-title">{post.titulo}</h1>
        <div className="post-detail-meta">
          <span className="post-detail-author">
            Por: {post.usuario?.username || 'Anônimo'}
          </span>
          <span className="post-detail-date">
            {formatDate(post.createdAt)}
          </span>
        </div>
        <div className="post-detail-content">
          {post.texto}
        </div>
      </article>

      <section className="comments-section">
        <h2 className="comments-title">
          Comentários ({comments.length})
        </h2>

        <div className="comment-form-wrapper">
          <h3>Deixe seu comentário</h3>
          {commentError && <div className="error-message">{commentError}</div>}
          
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Seu ID de usuário"
                value={commentForm.userId}
                onChange={(e) => setCommentForm({...commentForm, userId: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Escreva seu comentário..."
                value={commentForm.texto}
                onChange={(e) => setCommentForm({...commentForm, texto: e.target.value})}
                rows="4"
                required
              />
            </div>
            <button type="submit" className="submit-button" disabled={submitting}>
              {submitting ? 'Enviando...' : 'Comentar'}
            </button>
          </form>
        </div>

        <div className="comments-list">
          {comments.length === 0 ? (
            <p className="no-comments">Nenhum comentário ainda. Seja o primeiro!</p>
          ) : (
            comments.map((comment) => (
              <CommentItem key={comment._id} comment={comment} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default PostDetail;
