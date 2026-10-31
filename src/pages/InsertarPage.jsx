import { useState } from 'react';
import Notice from '../components/Notice.jsx';
import ProductoForm from '../components/ProductoForm.jsx';
import { crearProducto } from '../services/productosApi.js';

export default function InsertarPage() {
  const [mensaje, setMensaje] = useState('');

  async function guardar(datos) {
    setMensaje('');
    await crearProducto(datos);
    setMensaje(`El producto «${datos.nombre}» se registró correctamente.`);
  }

  return (
    <section className="panel form-panel">
      <div className="panel-heading"><div><p className="panel-kicker">NUEVO REGISTRO</p><h2>Registrar producto</h2><p className="panel-subtitle">Completa los datos para añadir un producto al inventario.</p></div></div>
      <Notice kind="success">{mensaje}</Notice>
      <ProductoForm valoresIniciales={{ nombre: '', precio: '', stock: '0', usuario: 'SENATI' }} textoBoton="Guardar producto" onGuardar={guardar} limpiarAlGuardar/>
    </section>
  );
}
