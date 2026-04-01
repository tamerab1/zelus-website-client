import { apiFetch } from './api.js';

export const checkout = (checkoutData) =>
  apiFetch('/store/checkout', { method: 'POST', body: JSON.stringify(checkoutData) });
