export default function TablaProductos({ productos, mostrarEditar = false, onEditar }) {
  if (!productos.length) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">▤</span>
        <strong>Aún no hay productos</strong>
        <p>Cuando registres productos, aparecerán en esta lista.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="product-table">
        <thead><tr><th>Producto</th><th>Precio</th><th>Stock</th><th>Usuario</th>{mostrarEditar && <th><span className="sr-only">Acciones</span></th>}</tr></thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td><span className="product-icon">{(producto.nombre || '?').slice(0, 1).toUpperCase()}</span><span className="product-name">{producto.nombre}</span></td>
              <td className="price">S/ {Number(producto.precio).toFixed(2)}</td>
              <td><span className={`stock-pill${Number(producto.stock) === 0 ? ' out' : ''}`}>{producto.stock} unidades</span></td>
              <td className="user-cell">{producto.usuario || producto.Usuario || '—'}</td>
              {mostrarEditar && <td className="align-right"><button className="button button-small button-light" onClick={() => onEditar(producto)}>Editar <span aria-hidden="true">↗</span></button></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
