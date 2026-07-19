// src/contexts/CartContext.test.js
import { describe, it, expect } from 'vitest';
import { cartReducer } from './CartContext.js';

const sampleItem = { id: 1, title: 'Denim Jacket', price: 49.99, image: 'jacket.jpg' };

describe('cartReducer', () => {
  it('adds a new item with quantity 1 by default', () => {
    const state = cartReducer([], { type: 'ADD_ITEM', item: sampleItem });
    expect(state).toHaveLength(1);
    expect(state[0]).toMatchObject({ id: 1, quantity: 1 });
  });

  it('increments quantity when the same item is added again', () => {
    let state = cartReducer([], { type: 'ADD_ITEM', item: sampleItem });
    state = cartReducer(state, { type: 'ADD_ITEM', item: sampleItem });
    expect(state).toHaveLength(1);
    expect(state[0].quantity).toBe(2);
  });

  it('removes an item entirely', () => {
    let state = cartReducer([], { type: 'ADD_ITEM', item: sampleItem });
    state = cartReducer(state, { type: 'REMOVE_ITEM', id: 1 });
    expect(state).toHaveLength(0);
  });

  it('setting quantity to 0 removes the line item', () => {
    let state = cartReducer([], { type: 'ADD_ITEM', item: sampleItem });
    state = cartReducer(state, { type: 'SET_QUANTITY', id: 1, quantity: 0 });
    expect(state).toHaveLength(0);
  });

  it('setting a negative quantity is clamped and removed, never goes negative', () => {
    let state = cartReducer([], { type: 'ADD_ITEM', item: sampleItem });
    state = cartReducer(state, { type: 'SET_QUANTITY', id: 1, quantity: -5 });
    expect(state).toHaveLength(0);
  });

  it('CLEAR empties the cart', () => {
    let state = cartReducer([], { type: 'ADD_ITEM', item: sampleItem });
    state = cartReducer(state, { type: 'CLEAR' });
    expect(state).toEqual([]);
  });
});
