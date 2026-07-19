// src/hooks/useProducts.js
import { useState, useEffect, useMemo } from 'react';
import { getProducts, getCategories } from '../services/api.js';

/**
 * Fetches the full product catalog once, then exposes client-side
 * filtering (by category) and sorting so the UI stays snappy without
 * refetching on every interaction.
 */
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | success | error
  const [error, setError] = useState(null);

  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured'); // featured | price-asc | price-desc | rating

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus('loading');
      setError(null);
      try {
        const [productData, categoryData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        if (cancelled) return;
        setProducts(productData);
        setCategories(categoryData);
        setStatus('success');
      } catch (err) {
        if (cancelled) return;
        setError(err.message || 'Something went wrong loading products.');
        setStatus('error');
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const visibleProducts = useMemo(() => {
    let list = category === 'all'
      ? products
      : products.filter((p) => p.category === category);

    list = [...list];
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        break; // 'featured' keeps API order
    }
    return list;
  }, [products, category, sortBy]);

  return {
    products: visibleProducts,
    categories,
    status,
    error,
    category,
    setCategory,
    sortBy,
    setSortBy,
  };
}
