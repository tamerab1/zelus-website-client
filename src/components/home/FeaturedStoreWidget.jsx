import { useApp } from '../../context/AppContext.jsx';
import AlertBox from '../ui/AlertBox.jsx';
import storePackages from '../../data/storePackages.js';

// Show the two premium packages on the home page
const featured = storePackages.slice(2);

export default function FeaturedStoreWidget() {
  const { setCurrentView, handleCheckout, storeMessage } = useApp();

  return (
    <div className="stone-panel">
      <div className="panel-header flex items-center justify-between">
        <span className="font-fantasy text-xs tracking-widest" style={{ color: '#d4af37' }}>
          💎&nbsp; FEATURED STORE
        </span>
        <button
          onClick={() => setCurrentView('store')}
          className="font-fantasy text-xs tracking-widest transition-colors"
          style={{ color: '#444' }}
          onMouseOver={e => e.currentTarget.style.color = '#d4af37'}
          onMouseOut={e  => e.currentTarget.style.color = '#444'}
        >
          SHOP ALL →
        </button>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <AlertBox status={storeMessage} />

        {featured.map(pkg => (
          <div
            key={pkg.id}
            className="p-4"
            style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid #1e1a14', borderRadius: 2 }}
          >
            <div className="flex justify-between items-start mb-1">
              <span className="font-fantasy text-sm text-white">{pkg.name}</span>
              <span className="font-fantasy font-bold text-base"
                    style={{ color: '#d4af37', textShadow: '0 0 8px rgba(212,175,55,0.4)' }}>
                ${pkg.price}
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-3 font-sans" style={{ color: '#555' }}>
              {pkg.desc}
            </p>
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs" style={{ color: 'rgba(212,175,55,0.5)' }}>
                +{pkg.tokens} tokens
              </span>
              <button
                onClick={() => handleCheckout(pkg)}
                className="btn-gold-outline font-fantasy text-xs tracking-widest px-4 py-1.5"
              >
                PURCHASE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
