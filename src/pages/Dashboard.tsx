import  { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useServerContext } from '../contexts/ServerContext';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import NavigationMenu from '../components/NavigationMenu';
import ServerStats from '../components/ServerStats';
import CommandsWidget from '../components/widgets/CommandsWidget';
import SettingsWidget from '../components/widgets/SettingsWidget';
import WelcomeWidget from '../components/widgets/WelcomeWidget';
import TwitchWidget from '../components/widgets/TwitchWidget';
import UIWizardWidget from '../components/widgets/UIWizardWidget';

const Dashboard = () => {
  const { serverId } = useParams();
  const { servers, currentServer, setCurrentServer, updateServerWidget } = useServerContext();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'widgets'>('overview');
  
  // Set current server based on URL param if available
  useState(() => {
    if (serverId) {
      const server = servers.find(s => s.id === serverId);
      if (server) {
        setCurrentServer(server);
      }
    }
  });
  
  const handleWidgetConfigChange = (widgetId: string, config: any) => {
    updateServerWidget(currentServer.id, widgetId, config);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 flex overflow-hidden">
          <NavigationMenu />
          
          <main className="flex-1 overflow-y-auto bg-discord-dark p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center mb-6">
                <h1 className="text-2xl font-bold">{currentServer.name}</h1>
                <div className="ml-auto">
                  <div className="flex space-x-1">
                    <button 
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === 'overview' 
                          ? 'bg-discord-blue text-white' 
                          : 'bg-discord-darker text-gray-300 hover:bg-discord-blue/20 hover:text-white'
                      }`}
                      onClick={() => setActiveTab('overview')}
                    >
                      Overview
                    </button>
                    <button 
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === 'widgets' 
                          ? 'bg-discord-blue text-white' 
                          : 'bg-discord-darker text-gray-300 hover:bg-discord-blue/20 hover:text-white'
                      }`}
                      onClick={() => setActiveTab('widgets')}
                    >
                      Widgets
                    </button>
                  </div>
                </div>
              </div>
              
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <ServerStats serverId={currentServer.id} />
                </div>
              )}
              
              {activeTab === 'widgets' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <UIWizardWidget 
                    serverId={currentServer.id}
                    config={currentServer.widgets.uiWizard.config}
                    onConfigChange={(config) => handleWidgetConfigChange('uiWizard', config)}
                  />
                  
                  <TwitchWidget 
                    serverId={currentServer.id}
                    config={currentServer.widgets.twitch.config}
                    onConfigChange={(config) => handleWidgetConfigChange('twitch', config)}
                  />
                  
                  <CommandsWidget 
                    serverId={currentServer.id}
                    config={currentServer.widgets.commands.config}
                    onConfigChange={(config) => handleWidgetConfigChange('commands', config)}
                  />
                  
                  <WelcomeWidget 
                    serverId={currentServer.id}
                    config={currentServer.widgets.welcome.config}
                    onConfigChange={(config) => handleWidgetConfigChange('welcome', config)}
                  />
                  
                  <SettingsWidget 
                    serverId={currentServer.id}
                    config={currentServer.widgets.settings.config}
                    onConfigChange={(config) => handleWidgetConfigChange('settings', config)}
                  />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
 