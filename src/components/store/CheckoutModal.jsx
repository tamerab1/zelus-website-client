/**
 * CheckoutModal
 *
 * Shown when the player clicks "Purchase" on any store item.
 * Collects the in-game username, lets the player pick Stripe (card) or PayPal,
 * then redirects to the provider's hosted payment page.
 *
 * Security note: the slug (package_id) is sent to the backend which validates
 * the price from its own catalog — the displayed price is for UX only.
 */
import { useState } from 'react';
import { createStripeCheckout, createPayPalCheckout } from '../../services/paymentService.js';

const STRIPE_BLUE  = '#635bff';
const PAYPAL_GOLD  = '#ffc439';
const PAYPAL_NAVY  = '#003087';

export default function CheckoutModal({ pkg, currentUser, onClose }) {
  // Pre-fill the username from the logged-in account; player can change it.
  const [username, setUsername]   = useState(currentUser?.username ?? '');
  const [loading,  setLoading]    = useState(null);   // 'stripe' | 'paypal' | null
  const [error,    setError]      = useState('');

  if (!pkg) return null;

  // pkg.slug exists on storePackages (ranks); pkg.id is already a string on storePacks.
  const packageId = pkg.slug ?? pkg.id;

  const handlePayment = async (provider) => {
    const trimmed = username.trim();
    if (!trimmed) {
      setError('Please enter your in-game username.');
      return;
    }
    if (trimmed.length > 12) {
      setError('Username must be 12 characters or fewer.');
      return;
    }

    setError('');
    setLoading(provider);

    try {
      const fn = provider === 'stripe' ? createStripeCheckout : createPayPalCheckout;
      const data = await fn(packageId, trimmed);
      // Redirect the entire tab to the provider's secure checkout page.
      window.location.href = data.checkout_url;
    } catch (err) {
      setError(err.message || 'Payment could not be initiated. Please try again.');
      setLoading(null);
    }
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Panel */}
      <div
        className="stone-panel w-full max-w-md relative"
        style={{ borderRadius: 3, borderTopColor: pkg.badge }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-lg leading-none transition-colors"
          style={{ color: '#555' }}
          onMouseOver={e => e.currentTarget.style.color = '#fff'}
          onMouseOut={e  => e.currentTarget.style.color = '#555'}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <div className="panel-header">
          <span className="font-fantasy text-sm tracking-widest" style={{ color: '#d4af37' }}>
            SECURE CHECKOUT
          </span>
        </div>

        <div className="p-6 flex flex-col gap-5">

          {/* Order summary */}
          <div
            className="p-4 flex justify-between items-center"
            style={{
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 2,
            }}
          >
            <div>
              <p className="font-fantasy text-sm font-bold" style={{ color: pkg.badge }}>
                {pkg.name}
              </p>
              {pkg.tokens && (
                <p className="font-mono text-xs mt-0.5" style={{ color: '#d4af37' }}>
                  +{pkg.tokens.toLocaleString()} tokens
                </p>
              )}
            </div>
            <p className="font-fantasy text-2xl font-bold" style={{ color: '#fff' }}>
              ${pkg.price}
              <span className="text-xs ml-1" style={{ color: '#6a6058' }}>USD</span>
            </p>
          </div>

          {/* Username field */}
          <div>
            <label
              htmlFor="checkout-username"
              className="block font-fantasy text-xs tracking-widest mb-2"
              style={{ color: '#8a8070' }}
            >
              IN-GAME USERNAME
            </label>
            <input
              id="checkout-username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              maxLength={12}
              placeholder="Enter your character name"
              disabled={!!loading}
              className="w-full px-3 py-2 text-sm font-mono"
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid #2a2520',
                borderRadius: 2,
                color: '#e8e0d0',
                outline: 'none',
              }}
              onFocus={e  => e.currentTarget.style.borderColor = '#d4af37'}
              onBlur={e   => e.currentTarget.style.borderColor = '#2a2520'}
            />
            <p className="text-xs mt-1" style={{ color: '#555' }}>
              Items will be delivered to this character. Type{' '}
              <span className="font-mono" style={{ color: '#d4af37' }}>::claim</span>{' '}
              in-game after purchase.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div
              className="p-3 text-xs text-center font-bold font-fantasy tracking-widest border"
              style={{
                background: 'rgba(127,29,29,0.3)',
                border: '1px solid #991b1b',
                borderRadius: 2,
                color: '#fca5a5',
              }}
            >
              {error}
            </div>
          )}

          {/* Payment buttons */}
          <div className="flex flex-col gap-3">

            {/* Stripe — card */}
            <button
              onClick={() => handlePayment('stripe')}
              disabled={!!loading}
              className="w-full py-3 font-bold text-sm tracking-wide rounded-sm transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                background: loading === 'stripe' ? '#4f48cc' : STRIPE_BLUE,
                color: '#fff',
                opacity: loading && loading !== 'stripe' ? 0.4 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading === 'stripe' ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>💳</span>
              )}
              {loading === 'stripe' ? 'Redirecting…' : 'Pay with Card (Stripe)'}
            </button>

            {/* PayPal */}
            <button
              onClick={() => handlePayment('paypal')}
              disabled={!!loading}
              className="w-full py-3 font-bold text-sm tracking-wide rounded-sm transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                background: loading === 'paypal' ? '#e6b000' : PAYPAL_GOLD,
                color: PAYPAL_NAVY,
                opacity: loading && loading !== 'paypal' ? 0.4 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading === 'paypal' ? (
                <span
                  className="inline-block w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
                  style={{ borderColor: PAYPAL_NAVY, borderTopColor: 'transparent' }}
                />
              ) : (
                <span style={{ fontStyle: 'italic', fontWeight: 800 }}>Pay<span style={{ color: PAYPAL_NAVY }}>Pal</span></span>
              )}
              {loading === 'paypal' ? 'Redirecting…' : 'Pay with PayPal'}
            </button>

          </div>

          {/* Security notice */}
          <p className="text-center text-xs" style={{ color: '#444' }}>
            🔒 Payments are processed securely by Stripe / PayPal. We never see your card details.
          </p>

        </div>
      </div>
    </div>
  );
}
