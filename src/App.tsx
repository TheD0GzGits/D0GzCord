import  { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ServerProvider } from './contexts/ServerContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import DiscordChat from './pages/DiscordChat';
import Settings from './pages/Settings';
import BotStatus from './pages/BotStatus';
import UIWizard from './pages/UIWizard';
import WidgetStore from './pages/WidgetStore';
import Login from './pages/Login';
import Register from './pages/Register';
import PurchaseSetup from './pages/PurchaseSetup';
import NotFound from './pages/NotFound';

// Protected route component
const ProtectedRoute = ({ element, requiredRoles = [] }: { element: JSX.Element, requiredRoles?: string[] }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return element;
};

function AppRoutes() {
  const [themeMode] = useState<'light' | 'dark'>('dark');
  
  return (
    <div className={`h-screen w-full flex flex-col ${themeMode === 'dark' ? 'dark bg-discord-darkest' : 'light bg-white'}`}>
      <ServerProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/server/:serverId" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/chat" element={<ProtectedRoute element={<DiscordChat />} />} />
          <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
          <Route path="/bot-status" element={<ProtectedRoute element={<BotStatus />} requiredRoles={['admin', 'owner']} />} />
          <Route path="/ui-wizard" element={<ProtectedRoute element={<UIWizard />} />} />
          <Route path="/widget-store" element={<ProtectedRoute element={<WidgetStore />} />} />
          <Route path="/purchase-setup" element={<ProtectedRoute element={<PurchaseSetup />} requiredRoles={['user']} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ServerProvider>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
 