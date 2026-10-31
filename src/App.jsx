import { Navigate, Route, Routes } from 'react-router';
import Layout from './components/Layout.jsx';
import ConsultarPage from './pages/ConsultarPage.jsx';
import InsertarPage from './pages/InsertarPage.jsx';
import ModificarPage from './pages/ModificarPage.jsx';
import EditarProductoPage from './pages/EditarProductoPage.jsx';
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/consultar" replace />} />
        <Route path="consultar" element={<ConsultarPage />} />
        <Route path="insertar" element={<InsertarPage />} />
        <Route path="modificar" element={<ModificarPage />} />
        <Route path="modificar/:id" element={<EditarProductoPage />} />
        <Route path="*" element={<Navigate to="/consultar" replace />} />
      </Route>
    </Routes>
  );
}
