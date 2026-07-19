// src/components/Checkout/Checkout.test.js
import { describe, it, expect } from 'vitest';
import { validate } from './Checkout.js';

const validForm = {
  fullName: 'Arathi S',
  address: '221B Baker Street',
  city: 'Hubli',
  postalCode: '580001',
  cardNumber: '4111111111111111',
  expiry: '08/27',
  cvv: '123',
};

describe('checkout validate()', () => {
  it('returns no errors for a fully valid form', () => {
    expect(validate(validForm)).toEqual({});
  });

  it('flags a missing full name', () => {
    const errors = validate({ ...validForm, fullName: '  ' });
    expect(errors.fullName).toBeDefined();
  });

  it('flags an invalid postal code', () => {
    const errors = validate({ ...validForm, postalCode: 'abc' });
    expect(errors.postalCode).toBeDefined();
  });

  it('flags a card number that is not 16 digits', () => {
    const errors = validate({ ...validForm, cardNumber: '4111 1111' });
    expect(errors.cardNumber).toBeDefined();
  });

  it('accepts a card number with spaces if it has 16 digits total', () => {
    const errors = validate({ ...validForm, cardNumber: '4111 1111 1111 1111' });
    expect(errors.cardNumber).toBeUndefined();
  });

  it('flags an expiry not in MM/YY format', () => {
    const errors = validate({ ...validForm, expiry: '2027-08' });
    expect(errors.expiry).toBeDefined();
  });

  it('flags a CVV that is too short', () => {
    const errors = validate({ ...validForm, cvv: '12' });
    expect(errors.cvv).toBeDefined();
  });
});
