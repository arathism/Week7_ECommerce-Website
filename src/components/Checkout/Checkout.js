// src/components/Checkout/Checkout.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext.js';
import { useAuth } from '../../contexts/AuthContext.js';
import './Checkout.css';

const initialForm = {
  fullName: '',
  address: '',
  city: '',
  postalCode: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
};

export function validate(form) {
  const errors = {};
  if (!form.fullName.trim()) errors.fullName = 'Full name is required.';
  if (!form.address.trim()) errors.address = 'Address is required.';
  if (!form.city.trim()) errors.city = 'City is required.';
  if (!/^\d{4,10}$/.test(form.postalCode.trim())) {
    errors.postalCode = 'Enter a valid postal code.';
  }
  if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ''))) {
    errors.cardNumber = 'Card number must be 16 digits.';
  }
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry.trim())) {
    errors.expiry = 'Use MM/YY format.';
  }
  if (!/^\d{3,4}$/.test(form.cvv.trim())) {
    errors.cvv = 'Enter a valid CVV.';
  }
  return errors;
}

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ ...initialForm, fullName: user?.name || '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 6.5;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    // Simulated order placement — no real payment processing occurs.
    setTimeout(() => {
      setSubmitting(false);
      clearCart();
      navigate('/', { state: { orderPlaced: true } });
    }, 900);
  };

  if (items.length === 0) {
    return (
      <div className="checkout-empty">
        <p>Your bag is empty, so there's nothing to check out yet.</p>
      </div>
    );
  }

  return (
    <div className="checkout">
      <form className="checkout__form" onSubmit={handleSubmit} noValidate>
        <fieldset>
          <legend className="eyebrow">Shipping</legend>

          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            value={form.fullName}
            onChange={handleChange('fullName')}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
          {errors.fullName && <span id="fullName-error" className="field-error">{errors.fullName}</span>}

          <label htmlFor="address">Street address</label>
          <input
            id="address"
            value={form.address}
            onChange={handleChange('address')}
            aria-invalid={!!errors.address}
            aria-describedby={errors.address ? 'address-error' : undefined}
          />
          {errors.address && <span id="address-error" className="field-error">{errors.address}</span>}

          <div className="checkout__row">
            <div>
              <label htmlFor="city">City</label>
              <input
                id="city"
                value={form.city}
                onChange={handleChange('city')}
                aria-invalid={!!errors.city}
                aria-describedby={errors.city ? 'city-error' : undefined}
              />
              {errors.city && <span id="city-error" className="field-error">{errors.city}</span>}
            </div>
            <div>
              <label htmlFor="postalCode">Postal code</label>
              <input
                id="postalCode"
                value={form.postalCode}
                onChange={handleChange('postalCode')}
                aria-invalid={!!errors.postalCode}
                aria-describedby={errors.postalCode ? 'postalCode-error' : undefined}
              />
              {errors.postalCode && (
                <span id="postalCode-error" className="field-error">{errors.postalCode}</span>
              )}
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className="eyebrow">Payment (simulated)</legend>

          <label htmlFor="cardNumber">Card number</label>
          <input
            id="cardNumber"
            inputMode="numeric"
            placeholder="1234 5678 9012 3456"
            value={form.cardNumber}
            onChange={handleChange('cardNumber')}
            aria-invalid={!!errors.cardNumber}
            aria-describedby={errors.cardNumber ? 'cardNumber-error' : undefined}
          />
          {errors.cardNumber && (
            <span id="cardNumber-error" className="field-error">{errors.cardNumber}</span>
          )}

          <div className="checkout__row">
            <div>
              <label htmlFor="expiry">Expiry (MM/YY)</label>
              <input
                id="expiry"
                placeholder="08/27"
                value={form.expiry}
                onChange={handleChange('expiry')}
                aria-invalid={!!errors.expiry}
                aria-describedby={errors.expiry ? 'expiry-error' : undefined}
              />
              {errors.expiry && <span id="expiry-error" className="field-error">{errors.expiry}</span>}
            </div>
            <div>
              <label htmlFor="cvv">CVV</label>
              <input
                id="cvv"
                inputMode="numeric"
                value={form.cvv}
                onChange={handleChange('cvv')}
                aria-invalid={!!errors.cvv}
                aria-describedby={errors.cvv ? 'cvv-error' : undefined}
              />
              {errors.cvv && <span id="cvv-error" className="field-error">{errors.cvv}</span>}
            </div>
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
          {submitting ? 'Placing order…' : `Place order — $${total.toFixed(2)}`}
        </button>
      </form>

      <aside className="checkout__summary">
        <p className="eyebrow">Order summary</p>
        <ul className="checkout__items">
          {items.map((line) => (
            <li key={line.id}>
              <span>{line.title} × {line.quantity}</span>
              <span>${(line.price * line.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <hr className="hairline" />
        <div className="checkout__totals-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="checkout__totals-row">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="checkout__totals-row">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="checkout__totals-row checkout__totals-row--total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </aside>
    </div>
  );
}
