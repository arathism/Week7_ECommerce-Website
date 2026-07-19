// src/App.js
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.js';
import Loading from './components/Loading/Loading.js';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.js';
import ProtectedRoute from './components/ProtectedRoute.js';

// Route-level code splitting: each page is only downloaded when visited.
const Home = lazy(() => import('./pages/Home.js'));
const ProductDetail = lazy(() => import('./pages/ProductDetail.js'));
const CartPage = lazy(() => import('./pages/CartPage.js'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage.js'));
const Login = lazy(() => import('./pages/Login.js'));
const Register = lazy(() => import('./pages/Register.js'));
const NotFound = lazy(() => import('./pages/NotFound.js'));

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <ErrorBoundary>
          <Suspense fallback={<Loading label="Loading page" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <footer className="site-footer">
        <div className="container site-footer__row">
          <span>MARQUE — a catalog built for the frontend capstone.</span>
          <span>Product data from FakeStoreAPI.</span>
        </div>
      </footer>
    </>
  );
}
