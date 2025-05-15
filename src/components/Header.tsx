import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Bell, User, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useServerContext } from '../contexts/ServerContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { currentServer } = useServerContext();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-12 bg-discord-dark border-b border-gray-700 flex items-center justify-between px-4">
      <div className="flex items-center">
        <h1 className="text-lg font-bold">{currentServer.name}</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <button 
          className="p-2 rounded-full hover:bg-discord-darkest transition-colors"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 h-4 w-4 bg-discord-red rounded-full text-xs flex items-center justify-center">3</span>
        </button>
        
        <button 
          className="p-2 rounded-full hover:bg-discord-darkest transition-colors"
          onClick={() => navigate('/settings')}
        >
          <Settings size={20} />
        </button>
        
        <button 
          className="p-2 rounded-full hover:bg-discord-darkest transition-colors"
          onClick={() => navigate('/bot-status')}
        >
          <HelpCircle size={20} />
        </button>
        
        <div className="relative">
          <button 
            className="w-8 h-8 rounded-full overflow-hidden focus:outline-none"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <img 
              src={user?.avatarUrl || 'https://i.pravatar.cc/150?img=1'} 
              alt="User avatar" 
              className="w-full h-full object-cover"
            />
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-discord-darker rounded-lg shadow-lg overflow-hidden z-10">
              <div className="p-3 border-b border-gray-700">
                <div className="flex items-center">
                  <img 
                    src={user?.avatarUrl || 'https://i.pravatar.cc/150?img=1'} 
                    alt="User avatar" 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-semibold">{user?.username || 'User'}</div>
                    <div className="text-xs text-gray-400">#{user?.id.slice(0, 4) || '0000'}</div>
                  </div>
                </div>
              </div>
              
              <div className="py-1">
                <button 
                  className="user-menu-item w-full text-left"
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/settings');
                  }}
                >
                  <User size={16} />
                  My Profile
                </button>
                
                <button 
                  className="user-menu-item text-discord-red w-full text-left"
                  onClick={() => {
                    setShowUserMenu(false);
                    handleLogout();
                  }}
                >
                  <LogOut size={16} />
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {showNotifications && (
        <div className="absolute right-20 top-12 mt-2 w-80 bg-discord-darker rounded-lg shadow-lg overflow-hidden z-10">
          <div className="p-3 border-b border-gray-700 flex justify-between items-center">
            <h3 className="font-semibold">Notifications</h3>
            <button className="text-xs text-discord-blue">Mark all as read</button>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            <div className="p-3 border-b border-gray-700 hover:bg-discord-dark cursor-pointer">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 rounded-full bg-discord-blue flex items-center justify-center">
                    <Bell size={16} />
                  </div>
                </div>
                <div>
                  <p className="text-sm">New update is available for D0GzBot!</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 border-b border-gray-700 hover:bg-discord-dark cursor-pointer">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 rounded-full bg-discord-green flex items-center justify-center">
                    <User size={16} />
                  </div>
                </div>
                <div>
                  <p className="text-sm">New member joined your server</p>
                  <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 hover:bg-discord-dark cursor-pointer">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 rounded-full bg-discord-red flex items-center justify-center">
                    <Settings size={16} />
                  </div>
                </div>
                <div>
                  <p className="text-sm">Server settings were updated</p>
                  <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
 