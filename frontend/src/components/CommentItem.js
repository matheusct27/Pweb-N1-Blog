import React from 'react';
import './CommentItem.css';

const CommentItem = ({ comment }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="comment-item">
      <div className="comment-header">
        <span className="comment-author">
          {comment.userId?.username || 'Anônimo'}
        </span>
        <span className="comment-date">
          {formatDate(comment.createdAt)}
        </span>
      </div>
      <p className="comment-text">{comment.texto}</p>
    </div>
  );
};

export default CommentItem;
