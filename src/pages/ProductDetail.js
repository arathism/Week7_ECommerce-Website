// src/pages/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../services/api.js';
import { useCart } from '../contexts/CartContext.js';
import Loading from '../components/Loading/Loading.js';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setAdded(false);
    getProduct(id)
      .then((data) => {
        if (cancelled) return;
        setProduct(data);
        setStatus('success');
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (status === 'loading') return <Loading label="Fetching this piece" />;

  if (status === 'error') {
    return (
      <div className="container product-detail__state">
        <p>{error}</p>
        <Link to="/" className="btn">Back to catalog</Link>
      </div>
    );
  }

  const skuLabel = `NO. ${String(product.id).padStart(4, '0')}`;

  return (
    <div className="container product-detail">
      <Link to="/" className="product-detail__back">← Back to catalog</Link>

      <div className="product-detail__grid">
        <div className="product-detail__image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="product-detail__info">
          <span className="eyebrow">{skuLabel} · {product.category}</span>
          <h1>{product.title}</h1>
          <div className="product-detail__rating">
            {'★'.repeat(Math.round(product.rating.rate))}
            {'☆'.repeat(5 - Math.round(product.rating.rate))}
            <span>({product.rating.count} reviews)</span>
          </div>
          <p className="product-detail__price">${product.price.toFixed(2)}</p>
          <p className="product-detail__description">{product.description}</p>

          <div className="product-detail__actions">
            <div className="product-detail__qty">
              <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                addToCart({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.image,
                  quantity,
                });
                setAdded(true);
                setTimeout(() => setAdded(false), 1500);
              }}
            >
              {added ? 'Added to bag ✓' : 'Add to bag'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
