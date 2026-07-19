// src/pages/CheckoutPage.js
import React from 'react';
import Checkout from '../components/Checkout/Checkout.js';
import './CheckoutPage.css';

export default function CheckoutPage() {
  return (
    <div className="container checkout-page">
      <p className="eyebrow">Step 2 of 2</p>
      <h1>Checkout</h1>
      <Checkout />
    </div>
  );
}
