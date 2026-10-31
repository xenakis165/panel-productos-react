import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Notice from '../components/Notice.jsx';
import TablaProductos from '../components/TablaProductos.jsx';
import { obtenerProductos } from '../services/productosApi.js';

export default function ModificarPage() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const navegar = useNavigate();

  useEffect(() => {
    let vigente = true;
    obtenerProductos()
      .then((datos) => { if (vigente) setProductos(Array.isArray(datos) ? datos : []); })
      .catch((fallo) => { if (vigente) setError(fallo instanceof Error ? fallo.message : 'No se pudieron cargar los productos.'); })
      .finally(() => { if (vigente) setCargando(false); });
    return () => { vigente = false; };
  }, []);

  return (
    <section className="panel">
      <div className="panel-heading"><div><p className="panel-kicker">ACTUALIZACIÓN</p><h2>Selecciona un producto</h2><p className="panel-subtitle">Abre un registro para editar sus datos.</p></div></div>
      {cargando && <p className="loading"><span className="spinner"/> Cargando productos…</p>}
      {!cargando && <Notice>{error}</Notice>}
      {!cargando && !error && <TablaProductos productos={productos} mostrarEditar onEditar={(producto) => navegar(`/modificar/${producto.id}`)}/>}
    </section>
  );
}
