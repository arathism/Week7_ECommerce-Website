// src/pages/CartPage.js
import React from 'react';
import Cart from '../components/Cart/Cart.js';
import './CartPage.css';

export default function CartPage() {
  return (
    <div className="container cart-page">
      <p className="eyebrow">Order form</p>
      <h1>Your bag</h1>
      <Cart />
    </div>
  );
}
