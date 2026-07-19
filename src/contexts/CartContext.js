// src/contexts/CartContext.js
import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'marque_cart_v1';

function loadInitialCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item } = action;
      const existing = state.find((line) => line.id === item.id);
      if (existing) {
        return state.map((line) =>
          line.id === item.id
            ? { ...line, quantity: line.quantity + (item.quantity || 1) }
            : line
        );
      }
      return [...state, { ...item, quantity: item.quantity || 1 }];
    }
    case 'REMOVE_ITEM':
      return state.filter((line) => line.id !== action.id);
    case 'SET_QUANTITY':
      return state
        .map((line) =>
          line.id === action.id ? { ...line, quantity: Math.max(0, action.quantity) } : line
        )
        .filter((line) => line.quantity > 0);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadInitialCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (item) => dispatch({ type: 'ADD_ITEM', item });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_ITEM', id });
  const setQuantity = (id, quantity) => dispatch({ type: 'SET_QUANTITY', id, quantity });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const { itemCount, subtotal } = useMemo(() => {
    return items.reduce(
      (acc, line) => {
        acc.itemCount += line.quantity;
        acc.subtotal += line.quantity * line.price;
        return acc;
      },
      { itemCount: 0, subtotal: 0 }
    );
  }, [items]);

  const value = {
    items,
    addToCart,
    removeFromCart,
    setQuantity,
    clearCart,
    itemCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
