// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts.js';
import ProductList from '../components/ProductList/ProductList.js';
import './Home.css';

export default function Home() {
  const productData = useProducts();
  const location = useLocation();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (location.state?.orderPlaced) {
      setShowConfirmation(true);
      navigate(location.pathname, { replace: true, state: {} });
      const timer = setTimeout(() => setShowConfirmation(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  return (
    <div>
      {showConfirmation && (
        <div className="order-confirmation" role="status">
          Order placed — thank you. A confirmation has been stamped on your account.
        </div>
      )}

      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow">Catalog No. 08 — Est. 2026</p>
            <h1 className="hero__headline">
              Everyday goods,
              <br />
              catalogued properly.
            </h1>
            <p className="hero__sub">
              A small selection of clothing, jewelry, and electronics — each piece
              numbered, priced, and ready to add to your bag.
            </p>
          </div>

          <div className="hero__stamp" aria-hidden="true">
            <svg viewBox="0 0 160 160">
              <defs>
                <path
                  id="stampCircle"
                  d="M 80,80 m -62,0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
                />
              </defs>
              <circle className="hero__stamp-ring" cx="80" cy="80" r="76" />
              <circle className="hero__stamp-ring hero__stamp-ring--inner" cx="80" cy="80" r="48" />
              <text className="hero__stamp-text">
                <textPath href="#stampCircle" startOffset="0%">
                  · GENUINE ARTICLE · MARQUE CO · EST 2026 ·
                </textPath>
              </text>
              <text x="80" y="86" textAnchor="middle" className="hero__stamp-mark">M</text>
            </svg>
          </div>
        </div>
      </section>

      <section className="container">
        <ProductList {...productData} />
      </section>
    </div>
  );
}
