import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import RequestReset from './pages/RequestReset';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/request-reset" element={<RequestReset />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
      </Routes>
    
  );
}
