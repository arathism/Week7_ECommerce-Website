// src/components/ProductCard/ProductCard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext.js';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsAdding(true);
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    setTimeout(() => {
      setIsAdding(false);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1200);
    }, 350);
  };

  const skuLabel = `NO. ${String(product.id).padStart(4, '0')}`;

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <span className="product-card__sku">{skuLabel}</span>
      <div className="product-card__image">
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>
      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <h3 className="product-card__title">{product.title}</h3>
        <div className="product-card__rating" aria-label={`Rated ${product.rating.rate} of 5`}>
          {'★'.repeat(Math.round(product.rating.rate))}
          {'☆'.repeat(5 - Math.round(product.rating.rate))}
          <span>({product.rating.count})</span>
        </div>
        <div className="product-card__footer">
          <span className="product-card__price">${product.price.toFixed(2)}</span>
          <button
            type="button"
            className={`btn ${justAdded ? 'btn-primary' : ''}`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? 'Adding…' : justAdded ? 'Added ✓' : 'Add to bag'}
          </button>
        </div>
      </div>
    </Link>
  );
}
