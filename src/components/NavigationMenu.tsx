import  { useNavigate, useLocation } from 'react-router-dom';
import { Home, MessageCircle, Settings, Activity, ShoppingBag, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const NavigationMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: <Home size={18} />,
      roles: ['user', 'admin', 'owner']
    },
    {
      name: 'Discord Chat',
      path: '/chat',
      icon: <MessageCircle size={18} />,
      roles: ['user', 'admin', 'owner']
    },
    {
      name: 'Bot Status',
      path: '/bot-status',
      icon: <Activity size={18} />,
      roles: ['admin', 'owner']
    },
    {
      name: 'Widget Store',
      path: '/widget-store',
      icon: <ShoppingBag size={18} />,
      roles: ['user', 'admin', 'owner']
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings size={18} />,
      roles: ['user', 'admin', 'owner']
    },
    {
      name: 'Purchase Setup',
      path: '/purchase-setup',
      icon: <User size={18} />,
      roles: ['user']
    }
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => {
    return user && item.roles.includes(user.role);
  });

  return (
    <div className="w-56 bg-discord-darker border-r border-gray-700 flex flex-col p-3">
      <div className="space-y-1">
        {filteredMenuItems.map(item => (
          <button
            key={item.path}
            className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive(item.path)
                ? 'bg-discord-blue text-white'
                : 'text-gray-300 hover:bg-discord-dark hover:text-white'
            }`}
            onClick={() => navigate(item.path)}
          >
            <span className="mr-2">{item.icon}</span>
            {item.name}
          </button>
        ))}
      </div>
      
      {(user?.role === 'admin' || user?.role === 'owner') && (
        <>
          <div className="mt-6 mb-2 px-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Admin Controls</h3>
          </div>
          <div className="space-y-1">
            <button
              className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-discord-dark hover:text-white transition-colors"
            >
              <span className="mr-2"><Settings size={18} /></span>
              Bot Configuration
            </button>
            <button
              className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-discord-dark hover:text-white transition-colors"
            >
              <span className="mr-2"><User size={18} /></span>
              User Management
            </button>
          </div>
        </>
      )}
      
      {user?.role === 'owner' && (
        <>
          <div className="mt-6 mb-2 px-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Owner Controls</h3>
          </div>
          <div className="space-y-1">
            <button
              className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-discord-dark hover:text-white transition-colors"
            >
              <span className="mr-2"><Settings size={18} /></span>
              API Keys
            </button>
            <button
              className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-discord-dark hover:text-white transition-colors"
            >
              <span className="mr-2"><Activity size={18} /></span>
              Billing & Usage
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NavigationMenu;
 