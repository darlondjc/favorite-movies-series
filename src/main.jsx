import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import { useAuth, AuthProvider } from './contexts/auth';
import { GlobalProvider } from './contexts/global'
import { Home } from './pages/Home';
import Login from './pages/Login';
import { Movie } from './pages/Movie';
import Register from './pages/Register';

const Private = ({ Item }) => {
  const { signed } = useAuth();
  return signed ? <Item /> : <Login />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<App />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/home" element={<GlobalProvider><Private Item={Home} /></GlobalProvider>} />
        <Route path="movie/:id" element={<GlobalProvider><Private Item={Movie} /></GlobalProvider>} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
)
