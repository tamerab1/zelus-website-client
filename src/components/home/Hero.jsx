import { useApp } from '../../context/AppContext.jsx';

export default function Hero() {
  const { setCurrentView } = useApp();

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '78vh' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images8.alphacoders.com/100/1001402.jpg')",
          opacity: 0.22,
          filter: 'saturate(0.6)',
        }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0"
           style={{ background: 'linear-gradient(to bottom, rgba(5,5,7,0.35) 0%, rgba(5,5,7,0.6) 50%, rgba(5,5,7,0.97) 100%)' }} />
      <div className="absolute inset-0"
           style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(25,25,70,0.35) 0%, transparent 65%)' }} />
      {/* Lightning flash */}
      <div className="absolute inset-0 lightning-overlay" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 py-24 w-full max-w-4xl mx-auto">
        <p className="font-fantasy text-xs tracking-[0.55em] mb-4"
           style={{ color: 'rgba(212,175,55,0.5)' }}>
          OLD SCHOOL FANTASY RSPS
        </p>

        <h1
          className="font-fantasy font-black leading-none mb-6"
          style={{
            fontSize: 'clamp(4.5rem, 11vw, 10rem)',
            background: 'linear-gradient(180deg, #ffffff 0%, #f0d060 25%, #d4af37 55%, #7a5a10 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 45px rgba(212,175,55,0.45))',
          }}
        >
          ZELUS
        </h1>

        <p className="text-gray-400 text-base max-w-lg mx-auto mb-12 leading-relaxed font-sans font-light">
          Experience the pinnacle of custom RSPS. Fight legendary bosses,<br className="hidden sm:block" />
          compete in high-stakes PvP, and build your legacy.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <button className="btn-download font-fantasy text-sm tracking-widest uppercase px-10 sm:px-14 py-4">
            ⬇&nbsp; Download Client
          </button>
          <button className="btn-glass font-fantasy text-sm tracking-widest uppercase px-10 sm:px-12 py-4">
            💬&nbsp; Join Discord
          </button>
        </div>

        {/* Stats strip */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-14">
          {[
            { label: 'Players Online', value: '247+'    },
            { label: 'Registered',     value: '12,000+' },
            { label: 'Custom Items',   value: '500+'    },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="font-fantasy text-xl sm:text-2xl font-bold"
                   style={{ color: '#d4af37', textShadow: '0 0 12px rgba(212,175,55,0.4)' }}>
                {value}
              </div>
              <div className="text-xs tracking-widest mt-1 font-fantasy" style={{ color: '#555' }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
