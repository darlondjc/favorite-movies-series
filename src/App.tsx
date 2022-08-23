import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext, AuthProvider } from './contexts/auth';

export function App() {
  
  return (
    <AuthProvider>
      <div className="App">
        <Outlet />
      </div>
    </AuthProvider>
  )
}

export default App
