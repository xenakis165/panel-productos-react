import { NavLink } from 'react-router';

const links = [
  { to: '/consultar', label: 'Consultar productos', number: '01' },
  { to: '/insertar', label: 'Registrar producto', number: '02' },
  { to: '/modificar', label: 'Modificar productos', number: '03' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <a className="brand" href="/consultar" aria-label="Panel de productos">
        <span className="brand-mark">P</span>
        <span className="brand-copy">PRODUCTOS<small>Panel de gestión</small></span>
      </a>
      <p className="nav-label">MENÚ PRINCIPAL</p>
      <nav className="side-nav" aria-label="Menú principal">
        {links.map(({ to, label, number }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            <span className="nav-number">{number}</span>
            <span>{label}</span>
            <span className="nav-arrow" aria-hidden="true">›</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-foot"><span className="status-dot" /> API local <span className="status-port">:3000</span></div>
    </aside>
  );
}
