// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container" style={{ padding: '5.6rem 0', textAlign: 'center' }}>
      <p className="eyebrow">404</p>
      <h1 style={{ fontSize: 'var(--step-3)', fontStyle: 'italic', margin: '0.8rem 0' }}>
        This page isn't in the catalog.
      </h1>
      <Link to="/" className="btn btn-primary">Back to shopping</Link>
    </div>
  );
}
