import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { register } from '../../services/authService.js';
import AlertBox from '../ui/AlertBox.jsx';

export default function RegisterForm() {
  const { setCurrentView, authStatus, setAuthStatus } = useApp();
  const [regData,      setRegData]      = useState({ username: '', email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthStatus({ type: 'info', message: 'Encrypting and creating account...' });
    try {
      await register(regData);
      setAuthStatus({ type: 'success', message: 'Account created! You can now log in.' });
      setRegData({ username: '', email: '', password: '' });
      setTimeout(() => {
        setAuthStatus({ type: '', message: '' });
        setCurrentView('login');
      }, 2000);
    } catch (error) {
      setAuthStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-[80vh] px-4 py-16">
      <div className="stone-panel w-full max-w-md" style={{ borderRadius: 2 }}>

        <div className="panel-header text-center py-6">
          <h2 className="font-fantasy text-2xl font-bold tracking-widest text-white">JOIN THE REALM</h2>
          <p className="font-fantasy text-xs tracking-[0.3em] mt-2" style={{ color: '#555' }}>
            FORGE YOUR ACCOUNT
          </p>
        </div>

        <div className="p-8">
          <AlertBox status={authStatus} />

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Character Name"
              required
              maxLength="12"
              className="rpg-input font-fantasy text-sm tracking-wide px-4 py-3"
              value={regData.username}
              onChange={e => setRegData({ ...regData, username: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="rpg-input font-fantasy text-sm tracking-wide px-4 py-3"
              value={regData.email}
              onChange={e => setRegData({ ...regData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              required
              minLength="6"
              className="rpg-input font-fantasy text-sm tracking-wide px-4 py-3"
              value={regData.password}
              onChange={e => setRegData({ ...regData, password: e.target.value })}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-download mt-3 py-4 w-full font-fantasy text-sm tracking-widest uppercase"
            >
              {isSubmitting ? 'Encrypting...' : 'Create Account'}
            </button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={() => setCurrentView('login')}
              className="font-fantasy text-xs tracking-widest transition-colors"
              style={{ color: '#555' }}
              onMouseOver={e => e.currentTarget.style.color = '#d4af37'}
              onMouseOut={e  => e.currentTarget.style.color = '#555'}
            >
              Already have an account? LOGIN
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
