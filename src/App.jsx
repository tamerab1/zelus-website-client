import { useApp } from './context/AppContext.jsx';
import { isAdmin } from './utils/ranks.js';

import Navbar          from './components/layout/Navbar.jsx';
import Footer          from './components/layout/Footer.jsx';
import HomeView        from './components/home/HomeView.jsx';
import StoreView       from './components/store/StoreView.jsx';
import LoginForm       from './components/auth/LoginForm.jsx';
import RegisterForm    from './components/auth/RegisterForm.jsx';
import AccountPanel    from './components/account/AccountPanel.jsx';
import AdminDashboard  from './components/admin/AdminDashboard.jsx';
import VoteView        from './components/vote/VoteView.jsx';

function AppRoutes() {
  const { currentView, currentUser } = useApp();

  return (
    <>
      {currentView === 'home'   && <HomeView />}
      {currentView === 'store'  && <StoreView />}
      {currentView === 'login'  && <LoginForm />}
      {currentView === 'register' && <RegisterForm />}
      {currentView === 'panel'  && currentUser && <AccountPanel />}
      {currentView === 'admin'  && isAdmin(currentUser?.privilege) && <AdminDashboard />}
      {currentView === 'vote'   && <VoteView />}
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-zelus-dark text-white font-fantasy flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}
