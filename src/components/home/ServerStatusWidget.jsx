import { useApp } from '../../context/AppContext.jsx';

export default function ServerStatusWidget({ hiscores, loading }) {
  const { setCurrentView } = useApp();

  return (
    <div className="stone-panel">
      <div className="panel-header">
        <span className="font-fantasy text-xs tracking-widest" style={{ color: '#d4af37' }}>
          🌐&nbsp; SERVER STATUS
        </span>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* Online indicator */}
        <div
          className="flex items-center justify-between p-3"
          style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid #1e1a14', borderRadius: 2 }}
        >
          <span className="font-fantasy text-xs tracking-widest" style={{ color: '#888' }}>Status</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
            <span className="font-fantasy text-xs tracking-widest text-green-400">ONLINE</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Online Now',    value: '247'                              },
            { label: 'Top Champions', value: loading ? '—' : hiscores.length   },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="text-center p-4"
              style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid #1e1a14', borderRadius: 2 }}
            >
              <div className="font-fantasy text-xl font-bold" style={{ color: '#d4af37' }}>
                {value}
              </div>
              <div className="font-fantasy text-xs tracking-widest mt-1" style={{ color: '#555' }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <button className="btn-download w-full py-3 font-fantasy text-xs tracking-widest uppercase">
          ⬇&nbsp; Download Client
        </button>
        <button
          onClick={() => setCurrentView('register')}
          className="w-full py-3 font-fantasy text-xs tracking-widest uppercase transition-colors"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1e1a14', borderRadius: 3, color: '#555' }}
          onMouseOver={e => e.currentTarget.style.color = '#999'}
          onMouseOut={e  => e.currentTarget.style.color = '#555'}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
