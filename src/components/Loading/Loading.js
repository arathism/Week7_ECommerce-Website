// src/components/Loading/Loading.js
import React from 'react';
import './Loading.css';

export default function Loading({ label = 'Loading' }) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="loading__mark" aria-hidden="true" />
      <span className="loading__label">{label}…</span>
    </div>
  );
}
