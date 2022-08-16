import { Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Outlet />
      </div>
    </AuthProvider>
  )
}

export default App
