import React from 'react';
import './Card.scss';

const Card = ({ product }) => {
  return (
    <div className="card">
      <img
        className="card__thumbnail"
        src={product.thumbnail}
        alt={product.title}
      />
      <div className="card__content">
        <h2 className="card__title">{product.title}</h2>
        <p className="card__price">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Card;
