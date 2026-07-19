// src/components/Cart/Cart.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext.js';
import './Cart.css';

export default function Cart() {
  const { items, setQuantity, removeFromCart, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <p className="eyebrow">Your bag</p>
        <h2>It's empty in here.</h2>
        <p>Nothing tucked away yet — go find something worth carrying.</p>
        <Link to="/" className="btn btn-primary">
          Browse the catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <ul className="cart__lines">
        {items.map((line) => (
          <li key={line.id} className="cart__line">
            <img src={line.image} alt={line.title} className="cart__thumb" />
            <div className="cart__info">
              <p className="cart__title">{line.title}</p>
              <p className="cart__price">${line.price.toFixed(2)}</p>
            </div>
            <div className="cart__qty">
              <button
                type="button"
                aria-label={`Decrease quantity of ${line.title}`}
                onClick={() => setQuantity(line.id, line.quantity - 1)}
              >
                −
              </button>
              <span aria-live="polite">{line.quantity}</span>
              <button
                type="button"
                aria-label={`Increase quantity of ${line.title}`}
                onClick={() => setQuantity(line.id, line.quantity + 1)}
              >
                +
              </button>
            </div>
            <p className="cart__line-total">${(line.price * line.quantity).toFixed(2)}</p>
            <button
              type="button"
              className="cart__remove"
              onClick={() => removeFromCart(line.id)}
              aria-label={`Remove ${line.title} from bag`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="cart__summary">
        <div className="cart__summary-row">
          <span>Subtotal</span>
          <span className="cart__summary-amount">${subtotal.toFixed(2)}</span>
        </div>
        <p className="cart__summary-note">Shipping and taxes calculated at checkout.</p>
        <Link to="/checkout" className="btn btn-primary btn-block">
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}
