import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import { Home } from './pages/Home'
import { Movie } from './pages/Movie'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />} />
        <Route path="/" element={<Home />} />
        <Route path="movie/:id" element={<Movie />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
