/**
 * Payment service — calls the backend checkout endpoints and returns the
 * provider-hosted payment URL.  Prices are validated server-side; the frontend
 * only sends the package slug and the player's username.
 */
import { apiFetch } from './api.js';

/**
 * @param {string} packageId  — canonical slug (e.g. 'donator', 'pvp')
 * @param {string} username   — in-game character name
 * @returns {Promise<{checkout_url: string, session_id: string}>}
 */
export const createStripeCheckout = (packageId, username) =>
  apiFetch('/api/checkout/stripe', {
    method: 'POST',
    body: JSON.stringify({ package_id: packageId, username }),
  });

/**
 * @param {string} packageId  — canonical slug
 * @param {string} username   — in-game character name
 * @returns {Promise<{checkout_url: string, order_id: string}>}
 */
export const createPayPalCheckout = (packageId, username) =>
  apiFetch('/api/checkout/paypal', {
    method: 'POST',
    body: JSON.stringify({ package_id: packageId, username }),
  });
