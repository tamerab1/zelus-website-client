import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { isAdmin } from '../../utils/ranks.js';

const NAV_LINKS = [
  { label: 'HOME',   view: 'home'  },
  { label: 'STORE',  view: 'store' },
  { label: 'FORUMS', view: null    },
  { label: 'VOTE',   view: 'vote'  },
];

export default function Navbar() {
  const { currentView, setCurrentView, currentUser, handleLogout } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (view) => {
    if (view) setCurrentView(view);
    setMenuOpen(false);
  };

  const NavLink = ({ label, view }) => (
    <button
      onClick={() => navigate(view)}
      className="font-fantasy text-xs tracking-widest relative transition-all"
      style={{
        color:      currentView === view ? '#d4af37' : '#666',
        textShadow: currentView === view ? '0 0 10px rgba(212,175,55,0.5)' : 'none',
        cursor:     view ? 'pointer' : 'default',
      }}
      onMouseOver={e => { if (view && currentView !== view) e.currentTarget.style.color = '#999'; }}
      onMouseOut={e  => { if (currentView !== view) e.currentTarget.style.color = '#666'; }}
    >
      {label}
      {currentView === view && (
        <span className="absolute -bottom-0.5 left-0 right-0 h-px"
              style={{ background: 'rgba(212,175,55,0.5)' }} />
      )}
    </button>
  );

  return (
    <nav className="sticky top-0 z-50 shadow-2xl"
         style={{ background: 'linear-gradient(180deg, #0c0c10 0%, #080809 100%)', borderBottom: '1px solid #1e1a14' }}>

      {/* Gold top strip */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent 0%, #8b6914 15%, #f0d060 50%, #8b6914 85%, transparent 100%)' }} />

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">

        {/* Logo */}
        <button onClick={() => navigate('home')} className="shrink-0">
          <span className="font-fantasy text-xl font-bold tracking-[0.25em]"
                style={{ color: '#d4af37', textShadow: '0 0 18px rgba(212,175,55,0.55), 0 0 40px rgba(212,175,55,0.2)' }}>
            ✦ ZELUS ✦
          </span>
        </button>

        {/* ── Desktop nav links ── */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => <NavLink key={link.label} {...link} />)}

          {isAdmin(currentUser?.privilege) && (
            <button
              onClick={() => navigate('admin')}
              className="font-fantasy text-xs tracking-widest transition-all"
              style={{ color: currentView === 'admin' ? '#f87171' : '#7f1d1d' }}
            >
              ADMIN CP
            </button>
          )}
        </div>

        {/* ── Desktop auth ── */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          {!currentUser ? (
            <>
              <button
                onClick={() => navigate('login')}
                className="font-fantasy text-xs tracking-widest transition-colors"
                style={{ color: '#666' }}
                onMouseOver={e => e.currentTarget.style.color = '#999'}
                onMouseOut={e  => e.currentTarget.style.color = '#666'}
              >
                LOGIN
              </button>
              <button onClick={() => navigate('register')} className="btn-download font-fantasy text-xs tracking-widest px-5 py-2">
                REGISTER
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('panel')}
                className="font-fantasy text-xs tracking-widest"
                style={{ color: '#d4af37' }}
              >
                {currentUser.username}
              </button>
              <button
                onClick={handleLogout}
                title="Logout"
                className="text-sm transition-colors"
                style={{ color: '#444' }}
                onMouseOver={e => e.currentTarget.style.color = '#f87171'}
                onMouseOut={e  => e.currentTarget.style.color = '#444'}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden font-fantasy text-xl shrink-0 transition-colors"
          style={{ color: menuOpen ? '#d4af37' : '#666' }}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* ── Mobile dropdown menu ── */}
      {menuOpen && (
        <div className="md:hidden" style={{ background: '#080809', borderBottom: '1px solid #1e1a14' }}>
          <div className="flex flex-col px-6 py-4 gap-1">
            {NAV_LINKS.map(({ label, view }) => (
              <button
                key={label}
                onClick={() => navigate(view)}
                className="font-fantasy text-xs tracking-widest text-left py-3 transition-colors"
                style={{
                  color:        currentView === view ? '#d4af37' : '#666',
                  borderBottom: '1px solid #1e1a14',
                  cursor:       view ? 'pointer' : 'default',
                }}
              >
                {label}
              </button>
            ))}

            {isAdmin(currentUser?.privilege) && (
              <button
                onClick={() => navigate('admin')}
                className="font-fantasy text-xs tracking-widest text-left py-3 text-red-700 transition-colors"
                style={{ borderBottom: '1px solid #1e1a14' }}
              >
                ADMIN CP
              </button>
            )}

            {/* Mobile auth */}
            <div className="pt-4 flex flex-col gap-3">
              {!currentUser ? (
                <>
                  <button
                    onClick={() => navigate('login')}
                    className="font-fantasy text-xs tracking-widest text-left py-2"
                    style={{ color: '#666' }}
                  >
                    LOGIN
                  </button>
                  <button
                    onClick={() => navigate('register')}
                    className="btn-download font-fantasy text-xs tracking-widest py-3 w-full"
                  >
                    REGISTER
                  </button>
                </>
              ) : (
                <div className="flex justify-between items-center py-2">
                  <button
                    onClick={() => navigate('panel')}
                    className="font-fantasy text-xs tracking-widest"
                    style={{ color: '#d4af37' }}
                  >
                    {currentUser.username}
                  </button>
                  <button
                    onClick={() => { handleLogout(); setMenuOpen(false); }}
                    className="font-fantasy text-xs tracking-widest transition-colors"
                    style={{ color: '#666' }}
                  >
                    LOGOUT
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Gold ornament divider */}
      <div className="gold-divider" />
    </nav>
  );
}
