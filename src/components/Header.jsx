import { useLocation } from 'react-router';

const sections = [
  { prefix: '/consultar', eyebrow: 'CONSULTA', title: 'Consultar productos', description: 'Revisa el inventario disponible.' },
  { prefix: '/insertar', eyebrow: 'NUEVO REGISTRO', title: 'Registrar producto', description: 'Añade un producto al inventario.' },
  { prefix: '/modificar', eyebrow: 'ACTUALIZACIÓN', title: 'Modificar productos', description: 'Elige un producto para actualizar.' },
];

export default function Header() {
  const { pathname } = useLocation();
  const section = sections.find(({ prefix }) => pathname.startsWith(prefix)) || sections[0];
  const editing = /^\/modificar\/[^/]+/.test(pathname);

  return (
    <header className="topbar">
      <div>
        <div className="eyebrow">GESTIÓN DE INVENTARIO <span>/</span> {editing ? 'EDICIÓN' : section.eyebrow}</div>
        <h1>{editing ? 'Editar producto' : section.title}</h1>
        <p>{editing ? 'Actualiza los datos del producto seleccionado.' : section.description}</p>
      </div>
      <div className="profile"><span className="avatar">A</span><span>Administrador<small>Panel local</small></span></div>
    </header>
  );
}
