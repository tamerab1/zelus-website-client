import { useApp } from '../../context/AppContext.jsx';
import AlertBox from '../ui/AlertBox.jsx';
import storePackages from '../../data/storePackages.js';

export default function StoreView() {
  const { storeMessage, handleCheckout } = useApp();

  return (
    <main className="max-w-7xl mx-auto pt-16 px-4 sm:px-6 pb-24">

      {/* Header */}
      <div className="text-center mb-14">
        <p className="font-fantasy text-xs tracking-[0.45em] mb-3"
           style={{ color: 'rgba(212,175,55,0.45)' }}>
          SUPPORT THE SERVER
        </p>
        <h2 className="font-fantasy text-4xl sm:text-5xl font-bold mb-6"
            style={{ color: 'white', textShadow: '0 0 30px rgba(212,175,55,0.15)' }}>
          THE EMPORIUM
        </h2>
        <div className="gold-divider max-w-xs mx-auto" />
        <p className="font-sans text-gray-500 max-w-md mx-auto mt-8 text-sm leading-relaxed font-light">
          Enhance your journey. Supporting the server grants exclusive rewards and permanent ranks.
        </p>
      </div>

      <AlertBox status={storeMessage} className="max-w-2xl mx-auto" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {storePackages.map((pkg) => (
          <div
            key={pkg.id}
            className="stone-panel flex flex-col transition-transform duration-300 hover:-translate-y-1"
            style={{ borderRadius: 2 }}
          >
            {/* Banner */}
            <div className={`h-28 bg-gradient-to-br ${pkg.color} relative flex items-center justify-center overflow-hidden`}>
              <div className="absolute inset-0"
                   style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)' }} />
              <h3 className="relative z-10 font-fantasy text-base font-bold text-white text-center px-3"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>
                {pkg.name}
              </h3>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="text-center mb-5">
                <span className="font-fantasy text-4xl font-bold text-white">${pkg.price}</span>
                <span className="text-xs ml-1" style={{ color: '#555' }}>USD</span>
              </div>
              <p className="text-xs text-center leading-relaxed flex-grow mb-5 font-sans"
                 style={{ color: '#666' }}>
                {pkg.desc}
              </p>
              <div className="text-center py-2 mb-5 font-mono text-xs tracking-widest"
                   style={{
                     color: '#d4af37',
                     background: 'rgba(212,175,55,0.05)',
                     border: '1px solid rgba(212,175,55,0.12)',
                     borderRadius: 2,
                   }}>
                +{pkg.tokens} TOKENS
              </div>
              <button
                onClick={() => handleCheckout(pkg)}
                className="btn-gold-outline w-full py-3 font-fantasy text-xs tracking-widest uppercase font-bold"
              >
                Purchase
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
