import React from 'react';
import { Link } from 'react-router-dom';
import './PostCard.css';

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="post-card">
      <h2 className="post-card-title">{post.titulo}</h2>
      <p className="post-card-text">
        {post.texto.substring(0, 150)}
        {post.texto.length > 150 ? '...' : ''}
      </p>
      <div className="post-card-footer">
        <span className="post-card-author">
          Por: {post.usuario?.username || 'Anônimo'}
        </span>
        <span className="post-card-date">
          {formatDate(post.createdAt)}
        </span>
      </div>
      <Link to={`/post/${post._id}`} className="post-card-button">
        Ler mais
      </Link>
    </div>
  );
};

export default PostCard;
