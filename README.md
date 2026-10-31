# Panel de productos con React

Frontend académico construido con React y Vite para consultar, registrar y modificar productos mediante una API REST existente.

## Funcionalidades

- Consulta productos en una tabla.
- Registra productos mediante un formulario validado.
- Selecciona un producto, carga sus datos y guarda modificaciones.
- Presenta mensajes de carga, confirmación y error.

## Tecnologías

- React y Vite
- React Router para la navegación
- Formik y Yup para gestionar y validar formularios
- Fetch para consumir la API

## Requisitos

- Node.js y npm
- API de productos activa en `http://localhost:3000`
- MySQL conectado a la API

## Instalación y ejecución

1. Instala las dependencias con `npm install`.
2. Enciende la API en una terminal.
3. Inicia este frontend en otra terminal con `npm run dev`.
4. Abre la dirección local que muestre Vite (normalmente `http://localhost:5173`).

Durante el desarrollo, Vite redirige las solicitudes `/api` a `http://localhost:3000`, por lo que ambos servidores deben estar activos.

## Endpoints utilizados

| Método | Ruta | Uso |
| --- | --- | --- |
| `GET` | `/api/productos` | Listar productos |
| `GET` | `/api/productos/:id` | Obtener un producto para editar |
| `POST` | `/api/productos` | Registrar un producto |
| `PUT` | `/api/productos/:id` | Actualizar un producto |

El formulario valida nombre, precio, stock y usuario antes de enviar los datos. La tabla reconoce el nombre de usuario que devuelve la API (`Usuario`).

## Compilación

Genera la versión de producción con `npm run build`. Los archivos resultantes se guardan en `dist/`.
