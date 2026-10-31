const API_URL = (import.meta.env.VITE_API_URL || '/api/productos').replace(/\/$/, '');

async function request(url, options) {
  let response;
  try {
    response = await fetch(url, options);
  } catch {
    throw new Error('No se pudo conectar con la API. Comprueba que esté encendida en http://localhost:3000.');
  }

  if (!response.ok) {
    let message = '';
    try {
      const body = await response.json();
      message = body.mensaje || body.message || body.error || '';
    } catch {
      // Algunas respuestas del servidor no incluyen JSON.
    }
    throw new Error(message || `La solicitud falló (HTTP ${response.status}).`);
  }

  if (response.status === 204) return null;
  return response.json();
}

export const obtenerProductos = () => request(API_URL);
export const obtenerProducto = (id) => request(`${API_URL}/${encodeURIComponent(id)}`);

export const crearProducto = (producto) => request(API_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(producto),
});

export const actualizarProducto = (id, producto) => request(`${API_URL}/${encodeURIComponent(id)}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(producto),
});
