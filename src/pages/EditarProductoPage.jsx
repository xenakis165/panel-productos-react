import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Notice from '../components/Notice.jsx';
import ProductoForm from '../components/ProductoForm.jsx';
import { actualizarProducto, obtenerProducto } from '../services/productosApi.js';

export default function EditarProductoPage() {
  const { id } = useParams();
  const navegar = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let vigente = true;
    setCargando(true);
    setError('');
    obtenerProducto(id)
      .then((datos) => { if (vigente) setProducto(datos); })
      .catch((fallo) => { if (vigente) setError(fallo instanceof Error ? fallo.message : 'No se encontró el producto.'); })
      .finally(() => { if (vigente) setCargando(false); });
    return () => { vigente = false; };
  }, [id]);

  async function guardar(datos) {
    await actualizarProducto(id, datos);
    navegar('/modificar', { state: { actualizado: true } });
  }

  if (cargando) return <section className="panel"><p className="loading"><span className="spinner"/> Cargando producto…</p></section>;
  if (error) return <section className="panel"><Notice>{error}</Notice><button className="button button-light" onClick={() => navegar('/modificar')}>Volver a la lista</button></section>;
  if (!producto) return <section className="panel"><p>No se encontró el producto.</p></section>;

  return (
    <section className="panel form-panel">
      <div className="panel-heading"><div><p className="panel-kicker">PRODUCTO #{producto.id}</p><h2>Modificar producto</h2><p className="panel-subtitle">Actualiza los campos y guarda los cambios.</p></div></div>
      <ProductoForm
        key={producto.id}
        valoresIniciales={{ nombre: producto.nombre ?? '', precio: String(producto.precio ?? ''), stock: String(producto.stock ?? ''), usuario: producto.usuario ?? producto.Usuario ?? 'SENATI' }}
        textoBoton="Guardar cambios"
        onGuardar={guardar}
        onCancelar={() => navegar('/modificar')}
      />
    </section>
  );
}
