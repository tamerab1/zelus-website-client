import LoadingSpinner, { ServerDownBanner } from '../ui/LoadingSpinner.jsx';
import { rankIcon } from '../../utils/ranks.js';

export default function HiscoresWidget({ hiscores, loading, error }) {
  return (
    <div className="stone-panel">
      <div className="panel-header">
        <span className="font-fantasy text-xs tracking-widest" style={{ color: '#d4af37' }}>
          ⚔&nbsp; TOP PLAYERS
        </span>
      </div>

      <div className="p-4">
        {loading && <LoadingSpinner text="Scanning the realms..." />}

        {!loading && error && <ServerDownBanner message={error} />}

        {!loading && !error && hiscores.length === 0 && (
          <p className="text-center py-10 text-xs font-fantasy tracking-widest" style={{ color: '#444' }}>
            No champions yet.
          </p>
        )}

        {!loading && !error && hiscores.length > 0 && (
          <div>
            {hiscores.slice(0, 10).map((p, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-3 py-2 transition-colors"
                style={{ borderBottom: '1px solid rgba(30,26,20,0.5)', cursor: 'default' }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseOut={e  => e.currentTarget.style.background = 'transparent'}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs w-6 text-center" style={{ color: '#555' }}>
                    {rankIcon(i)}
                  </span>
                  <span className="font-fantasy text-xs font-bold" style={{ color: '#d4af37' }}>
                    {p.username}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-xs text-white">{p.total_level}</span>
                  <span className="text-xs ml-1" style={{ color: '#444' }}>lvl</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
