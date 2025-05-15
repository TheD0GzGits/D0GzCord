import  { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useServerContext } from '../contexts/ServerContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { servers, currentServer, setCurrentServer } = useServerContext();
  const [showAddServer, setShowAddServer] = useState(false);
  const navigate = useNavigate();

  const handleServerClick = (serverId: string) => {
    const server = servers.find(s => s.id === serverId);
    if (server) {
      setCurrentServer(server);
      navigate(`/server/${serverId}`);
    }
  };

  return (
    <div className="w-16 bg-discord-darkest flex flex-col items-center py-3 overflow-y-auto">
      {/* Home Button */}
      <div 
        className="server-icon bg-discord-blue mb-4 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <span className="text-xl">D</span>
      </div>
      
      <div className="w-8 h-0.5 bg-gray-700 rounded-full mb-4"></div>
      
      {/* Server List */}
      <div className="flex flex-col items-center space-y-2 w-full">
        {servers.map(server => (
          <div
            key={server.id}
            className={`server-icon group relative ${
              currentServer.id === server.id ? 'server-icon-active' : ''
            } cursor-pointer bg-discord-dark hover:bg-discord-blue text-white transition-all`}
            onClick={() => handleServerClick(server.id)}
          >
            {server.iconUrl ? (
              <img 
                src={server.iconUrl} 
                alt={server.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{server.name.charAt(0)}</span>
            )}
            <span className="server-tooltip">{server.name}</span>
          </div>
        ))}
        
        {/* Add Server Button */}
        <div 
          className="server-icon group relative bg-discord-dark hover:bg-discord-green text-discord-green hover:text-white cursor-pointer transition-all"
          onClick={() => setShowAddServer(true)}
        >
          <PlusCircle size={24} />
          <span className="server-tooltip">Add a Server</span>
        </div>
      </div>
      
      {/* Add Server Modal */}
      {showAddServer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-discord-darker rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Add a Server</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-discord-dark p-4 rounded-lg text-center cursor-pointer hover:bg-opacity-80 transition-colors">
                  <div className="w-16 h-16 bg-discord-blue rounded-full mx-auto flex items-center justify-center mb-2">
                    <span className="text-2xl">+</span>
                  </div>
                  <p className="font-medium">Create a Server</p>
                </div>
                
                <div className="bg-discord-dark p-4 rounded-lg text-center cursor-pointer hover:bg-opacity-80 transition-colors">
                  <div className="w-16 h-16 bg-discord-green rounded-full mx-auto flex items-center justify-center mb-2">
                    <PlusCircle size={32} />
                  </div>
                  <p className="font-medium">Join a Server</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-700">
                <button 
                  className="btn btn-primary w-full"
                  onClick={() => navigate('/purchase-setup')}
                >
                  Purchase Hosting
                </button>
                
                <p className="mt-2 text-sm text-gray-400 text-center">
                  Need a server host for your bot? We've got you covered.
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button 
                className="btn btn-outline"
                onClick={() => setShowAddServer(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
 