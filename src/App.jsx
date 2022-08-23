import { AuthProvider } from './contexts/auth';

function App() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export default App
