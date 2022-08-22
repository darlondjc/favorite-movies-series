import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import { Home } from './pages/Home';
import Login from './pages/Login';
import { Movie } from './pages/Movie';
import Register from './pages/Register';

const Private = ({ Item }: any) => {
  const signed = false;
  return signed ? <Item /> : <Login />;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
      <Routes>
        <Route element={<App />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/home" element={<Private Item={Home} />} />
        <Route path="movie/:id" element={<Private Item={Movie} />} />
      </Routes>
    </BrowserRouter>
)
