import  { useState } from 'react';
import { AlertCircle, Check, Info, ChevronUp, ChevronDown, Activity, MessageCircle, Terminal, AlertTriangle } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const BotStatus = () => {
  const [showAllLogs, setShowAllLogs] = useState(false);
  const [currentTab, setCurrentTab] = useState('overview');
  
  const mockLogs = [
    { id: 1, level: 'info', message: 'Bot started successfully', timestamp: '2023-05-15T09:00:00Z' },
    { id: 2, level: 'command', message: '!help command executed by User#1234', timestamp: '2023-05-15T09:15:00Z' },
    { id: 3, level: 'info', message: 'New member joined: NewUser#5678', timestamp: '2023-05-15T10:30:00Z' },
    { id: 4, level: 'warning', message: 'Rate limit hit on API endpoint', timestamp: '2023-05-15T11:45:00Z' },
    { id: 5, level: 'error', message: 'Failed to send message: Missing permissions', timestamp: '2023-05-15T12:00:00Z' },
    { id: 6, level: 'command', message: '!ban command executed by Admin#1234', timestamp: '2023-05-15T13:20:00Z' },
    { id: 7, level: 'info', message: 'User role updated: User#5678', timestamp: '2023-05-15T14:10:00Z' },
    { id: 8, level: 'warning', message: 'High memory usage detected', timestamp: '2023-05-15T15:30:00Z' },
    { id: 9, level: 'info', message: 'Scheduled task completed: Message cleanup', timestamp: '2023-05-15T16:00:00Z' },
    { id: 10, level: 'command', message: '!mute command executed by Mod#4321', timestamp: '2023-05-15T16:45:00Z' },
  ];

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'info':
        return <Info size={16} className="text-discord-blue" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-discord-yellow" />;
      case 'error':
        return <AlertCircle size={16} className="text-discord-red" />;
      case 'command':
        return <Terminal size={16} className="text-discord-purple" />;
      default:
        return <Info size={16} className="text-discord-blue" />;
    }
  };

  const getLevelClass = (level: string) => {
    switch (level) {
      case 'info':
        return 'bg-discord-blue/10 border-discord-blue/30';
      case 'warning':
        return 'bg-discord-yellow/10 border-discord-yellow/30';
      case 'error':
        return 'bg-discord-red/10 border-discord-red/30';
      case 'command':
        return 'bg-discord-purple/10 border-discord-purple/30';
      default:
        return 'bg-discord-blue/10 border-discord-blue/30';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden bg-discord-dark">
        <Header />
        
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto py-6 px-4">
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between">
              <h1 className="text-2xl font-bold mb-2 md:mb-0">Bot Status</h1>
              
              <div className="flex space-x-3">
                <button className="btn btn-outline">Refresh Status</button>
                <button className="btn btn-primary">Restart Bot</button>
              </div>
            </div>
            
            <div className="bg-discord-darker rounded-lg shadow-md overflow-hidden mb-6">
              <div className="border-b border-gray-700">
                <nav className="flex">
                  <button
                    className={`px-4 py-3 font-medium ${
                      currentTab === 'overview' 
                        ? 'text-white border-b-2 border-discord-blue' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setCurrentTab('overview')}
                  >
                    Overview
                  </button>
                  <button
                    className={`px-4 py-3 font-medium ${
                      currentTab === 'logs' 
                        ? 'text-white border-b-2 border-discord-blue' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setCurrentTab('logs')}
                  >
                    Logs
                  </button>
                  <button
                    className={`px-4 py-3 font-medium ${
                      currentTab === 'metrics' 
                        ? 'text-white border-b-2 border-discord-blue' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setCurrentTab('metrics')}
                  >
                    Metrics
                  </button>
                </nav>
              </div>
              
              <div className="p-6">
                {currentTab === 'overview' && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="bg-discord-darkest p-4 rounded-lg">
                        <div className="flex items-center mb-3">
                          <div className="mr-3 h-10 w-10 rounded-full bg-discord-green/20 flex items-center justify-center">
                            <Check size={20} className="text-discord-green" />
                          </div>
                          <div>
                            <h3 className="font-medium">Status</h3>
                            <div className="flex items-center text-discord-green">
                              <span className="text-sm font-semibold">Online</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-400">
                          Running for 3 days, 5 hours
                        </div>
                      </div>
                      
                      <div className="bg-discord-darkest p-4 rounded-lg">
                        <div className="flex items-center mb-3">
                          <div className="mr-3 h-10 w-10 rounded-full bg-discord-blue/20 flex items-center justify-center">
                            <Activity size={20} className="text-discord-blue" />
                          </div>
                          <div>
                            <h3 className="font-medium">Resource Usage</h3>
                            <div className="flex items-center text-discord-blue">
                              <span className="text-sm font-semibold">Healthy</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-400">
                          CPU: 2%, Memory: 156MB
                        </div>
                      </div>
                      
                      <div className="bg-discord-darkest p-4 rounded-lg">
                        <div className="flex items-center mb-3">
                          <div className="mr-3 h-10 w-10 rounded-full bg-discord-purple/20 flex items-center justify-center">
                            <Terminal size={20} className="text-discord-purple" />
                          </div>
                          <div>
                            <h3 className="font-medium">Command Usage</h3>
                            <div className="flex items-center text-discord-purple">
                              <span className="text-sm font-semibold">123 today</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-400">
                          Top: !help, !ping, !stats
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-discord-darkest p-4 rounded-lg mb-6">
                      <h3 className="font-medium mb-3">System Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between py-2 border-b border-gray-700">
                            <span className="text-gray-400">Node.js Version</span>
                            <span>16.15.0</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-700">
                            <span className="text-gray-400">Discord.js Version</span>
                            <span>14.7.1</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-700">
                            <span className="text-gray-400">Operating System</span>
                            <span>Linux 5.4.0</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between py-2 border-b border-gray-700">
                            <span className="text-gray-400">Connected Servers</span>
                            <span>3</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-700">
                            <span className="text-gray-400">Total Users</span>
                            <span>5,563</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-700">
                            <span className="text-gray-400">Last Restart</span>
                            <span>May 12, 2023</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-discord-darkest p-4 rounded-lg">
                      <h3 className="font-medium mb-3">Recent Incidents</h3>
                      
                      <div className="space-y-4">
                        <div className="p-3 rounded-md bg-discord-yellow/10 border border-discord-yellow/30">
                          <div className="flex items-center">
                            <AlertTriangle size={16} className="text-discord-yellow mr-2" />
                            <h4 className="font-medium">High Memory Usage</h4>
                            <span className="ml-auto text-xs text-gray-400">4 hours ago</span>
                          </div>
                          <p className="mt-1 text-sm text-gray-400">
                            Memory usage peaked at 85%. Potential memory leak in command handler.
                          </p>
                        </div>
                        
                        <div className="p-3 rounded-md bg-discord-red/10 border border-discord-red/30">
                          <div className="flex items-center">
                            <AlertCircle size={16} className="text-discord-red mr-2" />
                            <h4 className="font-medium">API Connection Failed</h4>
                            <span className="ml-auto text-xs text-gray-400">Yesterday</span>
                          </div>
                          <p className="mt-1 text-sm text-gray-400">
                            Connection to the Discord API was lost for 2 minutes. Bot automatically reconnected.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {currentTab === 'logs' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Recent Logs</h3>
                      <button 
                        className="text-discord-blue hover:underline text-sm flex items-center"
                        onClick={() => setShowAllLogs(true)}
                      >
                        View All Logs
                        <ChevronDown size={16} className="ml-1" />
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {mockLogs.slice(0, 5).map(log => (
                        <div 
                          key={log.id} 
                          className={`p-3 rounded-md border ${getLevelClass(log.level)}`}
                        >
                          <div className="flex items-center">
                            {getLevelIcon(log.level)}
                            <span className="ml-2 font-medium">{log.message}</span>
                            <span className="ml-auto text-xs text-gray-400">
                              {formatTimestamp(log.timestamp)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {currentTab === 'metrics' && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-medium mb-3">Command Usage (Last 7 Days)</h3>
                        <div className="bg-discord-darkest rounded-lg p-4">
                          <div className="h-60 flex items-center justify-center">
                            <p className="text-gray-400">
                              [Command Usage Chart Visualization]
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-3">Memory Usage (Last 24 Hours)</h3>
                        <div className="bg-discord-darkest rounded-lg p-4">
                          <div className="h-60 flex items-center justify-center">
                            <p className="text-gray-400">
                              [Memory Usage Chart Visualization]
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Top Commands</h3>
                      <div className="bg-discord-darkest rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-700">
                              <th className="text-left p-3">Command</th>
                              <th className="text-left p-3">Uses</th>
                              <th className="text-left p-3">Success Rate</th>
                              <th className="text-left p-3">Avg. Response Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-700">
                              <td className="p-3">!help</td>
                              <td className="p-3">142</td>
                              <td className="p-3">100%</td>
                              <td className="p-3">23ms</td>
                            </tr>
                            <tr className="border-b border-gray-700">
                              <td className="p-3">!ping</td>
                              <td className="p-3">98</td>
                              <td className="p-3">100%</td>
                              <td className="p-3">18ms</td>
                            </tr>
                            <tr className="border-b border-gray-700">
                              <td className="p-3">!stats</td>
                              <td className="p-3">67</td>
                              <td className="p-3">98%</td>
                              <td className="p-3">45ms</td>
                            </tr>
                            <tr className="border-b border-gray-700">
                              <td className="p-3">!ban</td>
                              <td className="p-3">12</td>
                              <td className="p-3">92%</td>
                              <td className="p-3">38ms</td>
                            </tr>
                            <tr>
                              <td className="p-3">!mute</td>
                              <td className="p-3">8</td>
                              <td className="p-3">100%</td>
                              <td className="p-3">29ms</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {showAllLogs && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-discord-darker rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-bold">Bot Logs</h2>
              <button 
                className="text-gray-400 hover:text-white text-xl"
                onClick={() => setShowAllLogs(false)}
              >
                &times;
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-4">
              <div className="space-y-3">
                {mockLogs.map(log => (
                  <div 
                    key={log.id} 
                    className={`p-3 rounded-md border ${getLevelClass(log.level)}`}
                  >
                    <div className="flex items-center">
                      {getLevelIcon(log.level)}
                      <span className="ml-2 font-medium">{log.message}</span>
                      <span className="ml-auto text-xs text-gray-400">
                        {formatTimestamp(log.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-700 flex justify-end">
              <button 
                onClick={() => setShowAllLogs(false)}
                className="btn btn-outline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotStatus;
 