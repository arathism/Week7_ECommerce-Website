// src/services/api.js
// Thin wrapper around FakeStoreAPI (https://fakestoreapi.com).
// Centralizing fetch calls here means the rest of the app never talks
// to `fetch` directly, and error handling stays consistent.

const BASE_URL = 'https://fakestoreapi.com';

async function request(path) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`);
  } catch (networkError) {
    throw new Error('Could not reach the store. Check your connection and try again.');
  }

  if (!response.ok) {
    throw new Error(`Store request failed (${response.status}). Please try again.`);
  }

  return response.json();
}

export function getProducts() {
  return request('/products');
}

export function getProduct(id) {
  return request(`/products/${id}`);
}

export function getCategories() {
  return request('/products/categories');
}

export function getProductsByCategory(category) {
  return request(`/products/category/${encodeURIComponent(category)}`);
}
