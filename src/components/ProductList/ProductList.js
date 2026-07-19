// src/components/ProductList/ProductList.js
import React from 'react';
import ProductCard from '../ProductCard/ProductCard.js';
import Loading from '../Loading/Loading.js';
import './ProductList.css';

export default function ProductList({
  products,
  categories,
  status,
  error,
  category,
  setCategory,
  sortBy,
  setSortBy,
}) {
  if (status === 'loading') {
    return <Loading label="Fetching the catalog" />;
  }

  if (status === 'error') {
    return (
      <div className="product-list__state">
        <p className="eyebrow">Catalog unavailable</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="product-list__controls">
        <div className="product-list__control">
          <label htmlFor="category-filter" className="eyebrow">
            Department
          </label>
          <select
            id="category-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="product-list__control">
          <label htmlFor="sort-by" className="eyebrow">
            Sort
          </label>
          <select id="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>

        <span className="product-list__count eyebrow">
          {products.length} {products.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {products.length === 0 ? (
        <div className="product-list__state">
          <p>No pieces match this filter yet. Try another department.</p>
        </div>
      ) : (
        <div className="product-list__grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
