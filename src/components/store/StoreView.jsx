import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import AlertBox from '../ui/AlertBox.jsx';
import storePackages from '../../data/storePackages.js';
import storePacks from '../../data/storePacks.js';

const FALLBACK_ICONS = {
  [`https://oldschool.runescape.wiki/images/Mystery_box_(Zelus).png`]: '📦',
  [`https://oldschool.runescape.wiki/images/Question_mark.png`]:       '❓',
  [`https://oldschool.runescape.wiki/images/Treasure_chest_(large).png`]: '🎁',
};

function RewardIcon({ src, label }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return <span className="text-base leading-none">{FALLBACK_ICONS[src] ?? '◆'}</span>;
  }
  return (
    <img
      src={src}
      alt={label}
      onError={() => setErrored(true)}
      className="w-5 h-5 object-contain shrink-0"
      style={{ imageRendering: 'pixelated' }}
    />
  );
}

// ── Donator Rank Card ─────────────────────────────────────────────────────────
function RankCard({ pkg, onCheckout }) {
  return (
    <div
      className="stone-panel flex flex-col relative transition-transform duration-300 hover:-translate-y-1"
      style={{ borderRadius: 3, borderTopColor: pkg.badge }}
    >
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="font-fantasy text-xs tracking-widest px-3 py-1 rounded-full"
                style={{ background: pkg.badge, color: '#0a0a14', fontWeight: 700 }}>
            POPULAR
          </span>
        </div>
      )}

      {/* Banner */}
      <div className={`bg-gradient-to-br ${pkg.color} px-5 pt-8 pb-5 flex flex-col items-center gap-2`}>
        <span className="text-4xl">{pkg.icon}</span>
        <h3 className="font-fantasy text-sm font-bold text-white text-center tracking-widest"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
          {pkg.name.toUpperCase()}
        </h3>
        <div className="w-10 h-px" style={{ background: `linear-gradient(90deg, transparent, ${pkg.badge}, transparent)` }} />
      </div>

      {/* Price */}
      <div className="text-center py-4 px-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <span className="font-fantasy text-3xl font-bold" style={{ color: pkg.badge }}>${pkg.price}</span>
        <span className="text-xs ml-1" style={{ color: '#6a6058' }}>USD</span>
        <div className="mt-1.5 font-mono text-xs tracking-widest" style={{ color: '#d4af37' }}>
          +{pkg.tokens.toLocaleString()} TOKENS
        </div>
      </div>

      {/* Benefits */}
      <div className="px-4 py-4 flex-grow">
        <ul className="space-y-2">
          {pkg.benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-xs mt-0.5 shrink-0" style={{ color: pkg.badge }}>✦</span>
              <span className="text-sm leading-snug" style={{ color: '#c8bfb0' }}>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="px-4 pb-5 pt-3">
        <button
          onClick={() => onCheckout(pkg)}
          className="w-full py-3 font-fantasy text-sm tracking-widest uppercase font-bold rounded-sm transition-all duration-200"
          style={{ background: `${pkg.badge}22`, border: `1px solid ${pkg.badge}66`, color: pkg.badge }}
          onMouseOver={e => { e.currentTarget.style.background = pkg.badge; e.currentTarget.style.color = '#0a0a14'; }}
          onMouseOut={e  => { e.currentTarget.style.background = `${pkg.badge}22`; e.currentTarget.style.color = pkg.badge; }}
        >
          Purchase
        </button>
      </div>
    </div>
  );
}

// ── Store Pack Card ───────────────────────────────────────────────────────────
function PackCard({ pack, onCheckout }) {
  return (
    <div
      className="stone-panel flex flex-col relative transition-transform duration-300 hover:-translate-y-1"
      style={{ borderRadius: 3, borderTopColor: pack.badge }}
    >
      {pack.best && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="font-fantasy text-xs tracking-widest px-3 py-1 rounded-full"
                style={{ background: pack.badge, color: '#0a0a14', fontWeight: 700 }}>
            BEST VALUE
          </span>
        </div>
      )}

      {/* Banner */}
      <div className={`bg-gradient-to-br ${pack.color} px-5 pt-7 pb-4 text-center`}>
        <h3 className="font-fantasy text-sm font-bold text-white tracking-widest"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
          {pack.name.toUpperCase()}
        </h3>
        <p className="text-xs mt-1.5 leading-snug" style={{ color: 'rgba(255,255,255,0.65)' }}>
          {pack.desc}
        </p>
        <div className="mt-3 w-10 h-px mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${pack.badge}, transparent)` }} />
      </div>

      {/* Price */}
      <div className="text-center py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <span className="font-fantasy text-3xl font-bold" style={{ color: pack.badge }}>${pack.price}</span>
        <span className="text-xs ml-1" style={{ color: '#6a6058' }}>USD</span>
      </div>

      {/* Rewards */}
      <div className="px-4 py-4 flex-grow">
        <p className="font-fantasy text-xs tracking-widest mb-3" style={{ color: '#8a8070' }}>INCLUDES</p>
        <ul className="space-y-2.5">
          {pack.rewards.map((r, i) => (
            <li key={i} className="flex items-center gap-2.5">
              <RewardIcon src={r.icon} label={r.label} />
              <span className="text-sm" style={{ color: '#c8bfb0' }}>{r.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="px-4 pb-5 pt-3">
        <button
          onClick={() => onCheckout(pack)}
          className="w-full py-3 font-fantasy text-sm tracking-widest uppercase font-bold rounded-sm transition-all duration-200"
          style={{ background: `${pack.badge}22`, border: `1px solid ${pack.badge}66`, color: pack.badge }}
          onMouseOver={e => { e.currentTarget.style.background = pack.badge; e.currentTarget.style.color = '#0a0a14'; }}
          onMouseOut={e  => { e.currentTarget.style.background = `${pack.badge}22`; e.currentTarget.style.color = pack.badge; }}
        >
          Purchase
        </button>
      </div>
    </div>
  );
}

// ── Main View ─────────────────────────────────────────────────────────────────
export default function StoreView() {
  const { storeMessage, handleCheckout } = useApp();

  return (
    <main className="max-w-7xl mx-auto pt-16 px-4 sm:px-6 pb-24">

      {/* Header */}
      <div className="text-center mb-14">
        <p className="font-fantasy text-sm tracking-[0.45em] mb-3"
           style={{ color: 'rgba(212,175,55,0.6)' }}>
          SUPPORT THE SERVER
        </p>
        <h2 className="font-fantasy text-4xl sm:text-5xl font-bold mb-4"
            style={{ color: 'white', textShadow: '0 0 30px rgba(212,175,55,0.2)' }}>
          THE EMPORIUM
        </h2>
        <div className="gold-divider max-w-xs mx-auto mb-6" />
        <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed">
          Support Zelus and unlock exclusive ranks, zones, and perks. All donations are permanent.
        </p>
      </div>

      <AlertBox status={storeMessage} className="max-w-2xl mx-auto mb-10" />

      {/* ── Donator Ranks ── */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-7">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3))' }} />
          <h3 className="font-fantasy text-base tracking-[0.3em]" style={{ color: '#d4af37' }}>
            👑 DONATOR RANKS
          </h3>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.3), transparent)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {storePackages.map(pkg => (
            <RankCard key={pkg.id} pkg={pkg} onCheckout={handleCheckout} />
          ))}
        </div>
      </section>

      {/* ── Store Packs ── */}
      <section className="mb-14">
        <div className="flex items-center gap-4 mb-7">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3))' }} />
          <h3 className="font-fantasy text-base tracking-[0.3em]" style={{ color: '#d4af37' }}>
            📦 ITEM PACKS
          </h3>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.3), transparent)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {storePacks.map(pack => (
            <PackCard key={pack.id} pack={pack} onCheckout={handleCheckout} />
          ))}
        </div>
      </section>

      {/* Info panel */}
      <div className="max-w-2xl mx-auto stone-panel" style={{ borderRadius: 3 }}>
        <div className="panel-header">
          <span className="font-fantasy text-sm tracking-widest" style={{ color: '#d4af37' }}>
            ℹ &nbsp;HOW IT WORKS
          </span>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: '📦', title: 'Permanent',  body: 'All ranks are permanent and never expire.' },
            { icon: '⬆',  title: 'Stackable',  body: 'Donating again upgrades your rank. Previous benefits are included.' },
            { icon: '🎁', title: 'Instant',    body: 'Items and rank are applied in-game within minutes.' },
          ].map(({ icon, title, body }) => (
            <div key={title} className="flex gap-4">
              <span className="text-2xl shrink-0">{icon}</span>
              <div>
                <p className="font-fantasy text-sm tracking-wide mb-1" style={{ color: '#e8e0d0' }}>{title}</p>
                <p className="text-xs leading-relaxed" style={{ color: '#8a8070' }}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}
