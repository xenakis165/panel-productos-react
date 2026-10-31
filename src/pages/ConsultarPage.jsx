import { useEffect, useState } from 'react';
import Notice from '../components/Notice.jsx';
import TablaProductos from '../components/TablaProductos.jsx';
import { obtenerProductos } from '../services/productosApi.js';

export default function ConsultarPage() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

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
      <div className="panel-heading"><div><p className="panel-kicker">INVENTARIO</p><h2>Lista de productos</h2></div><span className="record-count">{cargando ? 'Cargando…' : `${productos.length} ${productos.length === 1 ? 'producto' : 'productos'}`}</span></div>
      {cargando && <p className="loading"><span className="spinner"/> Cargando productos…</p>}
      {!cargando && <Notice>{error}</Notice>}
      {!cargando && !error && <TablaProductos productos={productos}/>}
    </section>
  );
}
