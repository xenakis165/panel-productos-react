import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Notice from './Notice.jsx';

const validationSchema = Yup.object({
  nombre: Yup.string().trim().required('Escribe el nombre del producto.').max(100, 'Usa hasta 100 caracteres.'),
  precio: Yup.number().typeError('Ingresa un precio válido.').moreThan(0, 'El precio debe ser mayor que cero.').required('Ingresa el precio.'),
  stock: Yup.number().typeError('Ingresa una cantidad válida.').integer('El stock debe ser un número entero.').min(0, 'El stock no puede ser negativo.').required('Ingresa el stock.'),
  usuario: Yup.string().trim().required('Escribe el usuario asociado al registro.').max(50, 'Usa hasta 50 caracteres.'),
});

export default function ProductoForm({ valoresIniciales, textoBoton, onGuardar, onCancelar, limpiarAlGuardar = false }) {
  const [serverError, setServerError] = useState('');

  return (
    <Formik
      initialValues={valoresIniciales}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={async (values, actions) => {
        setServerError('');
        try {
          await onGuardar({
            nombre: values.nombre.trim(),
            precio: Number(values.precio),
            stock: Number(values.stock),
            usuario: values.usuario.trim(),
          });
          if (limpiarAlGuardar) actions.resetForm({ values: { nombre: '', precio: '', stock: '0', usuario: 'SENATI' } });
        } catch (error) {
          setServerError(error instanceof Error ? error.message : 'No se pudo guardar el producto.');
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="product-form" noValidate>
          <Notice>{serverError}</Notice>
          <label className="field"><span>Nombre del producto</span><Field name="nombre" placeholder="Ej. Monitor 24 pulgadas"/><ErrorMessage name="nombre" component="small" className="field-error"/></label>
          <div className="form-row">
            <label className="field"><span>Precio (S/)</span><Field name="precio" type="number" min="0.01" step="0.01" placeholder="0.00"/><ErrorMessage name="precio" component="small" className="field-error"/></label>
            <label className="field"><span>Stock disponible</span><Field name="stock" type="number" min="0" step="1" placeholder="0"/><ErrorMessage name="stock" component="small" className="field-error"/></label>
          </div>
          <label className="field"><span>Usuario</span><Field name="usuario" placeholder="Ej. SENATI"/><small className="field-hint">Campo requerido por la API de productos.</small><ErrorMessage name="usuario" component="small" className="field-error"/></label>
          <div className="form-actions">
            {onCancelar && <button type="button" className="button button-light" onClick={onCancelar}>Cancelar</button>}
            <button className="button button-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Guardando…' : textoBoton}<span aria-hidden="true">→</span></button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
