export default function Footer() {
  return (
    <footer style={{ background: '#030305', borderTop: '1px solid #1e1a14' }}>
      <div className="gold-divider" />

      <div className="max-w-7xl mx-auto px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <h4 className="font-fantasy text-xl tracking-widest mb-5"
                style={{ color: '#d4af37', textShadow: '0 0 12px rgba(212,175,55,0.3)' }}>
              ✦ ZELUS RSPS ✦
            </h4>
            <p className="font-sans text-sm leading-loose max-w-sm font-light" style={{ color: '#555' }}>
              A dedicated team of developers and gamers committed to providing the most
              immersive custom RuneScape experience. Join thousands of players in our
              ever-evolving world.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h5 className="font-fantasy text-xs tracking-widest mb-5" style={{ color: '#444' }}>
              Navigation
            </h5>
            <ul className="space-y-3">
              {['Client Download', 'Account Security', 'Donor Store', 'Voting Rewards'].map(link => (
                <li
                  key={link}
                  className="font-fantasy text-xs tracking-wide cursor-pointer transition-colors"
                  style={{ color: '#555' }}
                  onMouseOver={e => e.currentTarget.style.color = '#d4af37'}
                  onMouseOut={e  => e.currentTarget.style.color = '#555'}
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h5 className="font-fantasy text-xs tracking-widest mb-5" style={{ color: '#444' }}>
              Community
            </h5>
            <div className="flex gap-3">
              {[['D', 'Discord'], ['Y', 'YouTube'], ['T', 'Twitter']].map(([letter, label]) => (
                <button
                  key={letter}
                  title={label}
                  className="w-9 h-9 flex items-center justify-center font-fantasy text-xs font-bold transition-all"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1e1a14', borderRadius: 2, color: '#555' }}
                  onMouseOver={e => { e.currentTarget.style.color = '#d4af37'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'; }}
                  onMouseOut={e  => { e.currentTarget.style.color = '#555';    e.currentTarget.style.borderColor = '#1e1a14'; }}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 font-fantasy text-xs tracking-widest"
             style={{ borderTop: '1px solid #1e1a14', color: '#333' }}>
          <p>© 2026 ZELUS PROJECT. ALL RIGHTS RESERVED.</p>
          <p className="mt-4 md:mt-0">NOT AFFILIATED WITH JAGEX LIMITED.</p>
        </div>
      </div>
    </footer>
  );
}
