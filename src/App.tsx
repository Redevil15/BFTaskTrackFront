import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate('/dashboard');
    }
  }, [isSignedIn, navigate]);

  return (
    <Routes>
      {/* Ruta principal pública */}
      <Route path="/" element={<Home />} />
      {/* Ruta protegida: Dashboard */}
      <Route
        path="/dashboard"
        element={isSignedIn ? <Dashboard /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default App;
