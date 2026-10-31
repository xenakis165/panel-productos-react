import { Outlet } from 'react-router';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';

export default function Layout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-area">
        <Header />
        <div className="page-content"><Outlet /></div>
        <footer className="footer">Panel de productos <span>•</span> React + Vite</footer>
      </main>
    </div>
  );
}
