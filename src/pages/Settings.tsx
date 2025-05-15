import   { useState } from 'react';
import { Settings as SettingsIcon, User, Shield, Database, AlertTriangle, Info } from 'lucide-react';
 
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Settings = () => {
  const [currentSection, setCurrentSection] = useState('general');
  const [restartConfirm, setRestartConfirm] = useState(false);
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden bg-discord-dark">
        <Header />
        
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto py-6 px-4 max-w-6xl">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            
            <div className="flex flex-col md:flex-row gap-6">
              {/* Settings Sidebar */}
              <div className="w-full md:w-64 shrink-0">
                <div className="bg-discord-darker rounded-lg shadow-md p-4">
                  <nav>
                    <ul className="space-y-1">
                      <li>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                            currentSection === 'general'
                              ? 'bg-discord-blue text-white'
                              : 'text-gray-300 hover:bg-discord-dark hover:text-white'
                          }`}
                          onClick={() => setCurrentSection('general')}
                        >
                          <SettingsIcon size={16} className="mr-2" />
                          General
                        </button>
                      </li>
                      <li>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                            currentSection === 'account'
                              ? 'bg-discord-blue text-white'
                              : 'text-gray-300 hover:bg-discord-dark hover:text-white'
                          }`}
                          onClick={() => setCurrentSection('account')}
                        >
                          <User size={16} className="mr-2" />
                          Account
                        </button>
                      </li>
                      <li>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                            currentSection === 'security'
                              ? 'bg-discord-blue text-white'
                              : 'text-gray-300 hover:bg-discord-dark hover:text-white'
                          }`}
                          onClick={() => setCurrentSection('security')}
                        >
                          <Shield size={16} className="mr-2" />
                          Security
                        </button>
                      </li>
                      <li>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                            currentSection === 'database'
                              ? 'bg-discord-blue text-white'
                              : 'text-gray-300 hover:bg-discord-dark hover:text-white'
                          }`}
                          onClick={() => setCurrentSection('database')}
                        >
                          <Database size={16} className="mr-2" />
                          Database
                        </button>
                      </li>
                      <li>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                            currentSection === 'danger'
                              ? 'bg-discord-red text-white'
                              : 'text-gray-300 hover:bg-discord-dark hover:text-white'
                          }`}
                          onClick={() => setCurrentSection('danger')}
                        >
                          <AlertTriangle size={16} className="mr-2" />
                          Danger Zone
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              
              {/* Settings Content */}
              <div className="flex-1">
                <div className="bg-discord-darker rounded-lg shadow-md p-6">
                  {currentSection === 'general' && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">General Settings</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="app-name" className="block text-sm font-medium text-gray-300 mb-1">
                            Application Name
                          </label>
                          <input 
                            type="text" 
                            id="app-name"
                            className="input"
                            defaultValue="D0GzBot Dashboard"
                          />
                          <p className="mt-1 text-sm text-gray-400">
                            The name displayed in the browser title and UI
                          </p>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label htmlFor="dark-mode" className="text-sm font-medium text-gray-300">
                              Dark Mode
                            </label>
                            <div className="toggle bg-discord-blue">
                              <span className="toggle-handle translate-x-6"></span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-400">
                            Enable dark mode for the dashboard interface
                          </p>
                        </div>
                        
                        <div>
                          <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-1">
                            Language
                          </label>
                          <select
                            id="language"
                            className="input"
                            defaultValue="en"
                          >
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                            <option value="ja">Japanese</option>
                          </select>
                          <p className="mt-1 text-sm text-gray-400">
                            The language used for the dashboard interface
                          </p>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label htmlFor="notifications" className="text-sm font-medium text-gray-300">
                              Desktop Notifications
                            </label>
                            <div className="toggle bg-discord-blue">
                              <span className="toggle-handle translate-x-6"></span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-400">
                            Receive desktop notifications for important events
                          </p>
                        </div>
                        
                        <div className="border-t border-gray-700 pt-4">
                          <button className="btn btn-primary w-full">
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {currentSection === 'account' && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                      
                      <div className="space-y-6">
                        <div className="flex items-center p-4 bg-discord-darkest rounded-lg">
                          <div className="relative mr-4">
                            <img
                              src="https://i.pravatar.cc/150?img=1"
                              alt="User"
                              className="w-16 h-16 rounded-full"
                            />
                            <button className="absolute bottom-0 right-0 bg-discord-blue text-white p-1 rounded-full">
                              <User size={14} />
                            </button>
                          </div>
                          <div>
                            <h3 className="font-medium">ServerAdmin</h3>
                            <p className="text-sm text-gray-400">admin@example.com</p>
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                            Username
                          </label>
                          <input 
                            type="text" 
                            id="username"
                            className="input"
                            defaultValue="ServerAdmin"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email
                          </label>
                          <input 
                            type="email" 
                            id="email"
                            className="input"
                            defaultValue="admin@example.com"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="new-password" className="block text-sm font-medium text-gray-300 mb-1">
                            New Password
                          </label>
                          <input 
                            type="password" 
                            id="new-password"
                            className="input"
                            placeholder="••••••••"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-1">
                            Confirm Password
                          </label>
                          <input 
                            type="password" 
                            id="confirm-password"
                            className="input"
                            placeholder="••••••••"
                          />
                        </div>
                        
                        <div className="border-t border-gray-700 pt-4">
                          <button className="btn btn-primary w-full">
                            Update Account
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {currentSection === 'security' && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label htmlFor="two-factor" className="text-sm font-medium text-gray-300">
                              Two-Factor Authentication
                            </label>
                            <div className="toggle bg-gray-600">
                              <span className="toggle-handle translate-x-1"></span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-400">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        
                        <div>
                          <label htmlFor="session-timeout" className="block text-sm font-medium text-gray-300 mb-1">
                            Session Timeout
                          </label>
                          <select
                            id="session-timeout"
                            className="input"
                            defaultValue="60"
                          >
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="120">2 hours</option>
                            <option value="240">4 hours</option>
                          </select>
                          <p className="mt-1 text-sm text-gray-400">
                            Automatically log out after period of inactivity
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-300 mb-2">Recent Login Activity</h3>
                          <div className="bg-discord-darkest rounded-lg overflow-hidden">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-gray-700">
                                  <th className="text-left p-3">Device</th>
                                  <th className="text-left p-3">IP Address</th>
                                  <th className="text-left p-3">Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-gray-700">
                                  <td className="p-3">Chrome on Windows</td>
                                  <td className="p-3">192.168.0.1</td>
                                  <td className="p-3">Today, 10:32 AM</td>
                                </tr>
                                <tr className="border-b border-gray-700">
                                  <td className="p-3">Safari on MacOS</td>
                                  <td className="p-3">192.168.0.5</td>
                                  <td className="p-3">Yesterday, 5:47 PM</td>
                                </tr>
                                <tr>
                                  <td className="p-3">Firefox on Linux</td>
                                  <td className="p-3">192.168.1.10</td>
                                  <td className="p-3">May 12, 2023, 9:15 AM</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-700 pt-4">
                          <button className="btn btn-primary w-full">
                            Save Security Settings
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {currentSection === 'database' && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Database Settings</h2>
                      
                      <div className="space-y-6">
                        <div className="p-4 bg-discord-blue/10 border border-discord-blue/30 rounded-md mb-4">
                          <div className="flex items-center mb-2">
                            <Info size={16} className="text-discord-blue mr-2" />
                            <h3 className="font-medium">Connected to MongoDB</h3>
                          </div>
                          <p className="text-sm text-gray-400">
                            Your bot is currently using MongoDB for data storage.
                          </p>
                        </div>
                        
                        <div>
                          <label htmlFor="database-uri" className="block text-sm font-medium text-gray-300 mb-1">
                            Database URI
                          </label>
                          <input 
                            type="text" 
                            id="database-uri"
                            className="input font-mono text-sm"
                            defaultValue="mongodb://username:********@localhost:27017/botdb"
                          />
                          <p className="mt-1 text-sm text-gray-400">
                            Connection string for your database
                          </p>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label htmlFor="auto-backup" className="text-sm font-medium text-gray-300">
                              Automatic Backups
                            </label>
                            <div className="toggle bg-discord-blue">
                              <span className="toggle-handle translate-x-6"></span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-400">
                            Create daily backups of your database
                          </p>
                        </div>
                        
                        <div>
                          <label htmlFor="backup-retention" className="block text-sm font-medium text-gray-300 mb-1">
                            Backup Retention
                          </label>
                          <select
                            id="backup-retention"
                            className="input"
                            defaultValue="7"
                          >
                            <option value="3">3 days</option>
                            <option value="7">7 days</option>
                            <option value="14">14 days</option>
                            <option value="30">30 days</option>
                          </select>
                          <p className="mt-1 text-sm text-gray-400">
                            How long to keep automatic backups
                          </p>
                        </div>
                        
                        <div className="flex space-x-3">
                          <button className="btn btn-primary flex-1">
                            Test Connection
                          </button>
                          <button className="btn btn-outline flex-1">
                            Create Backup
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {currentSection === 'danger' && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4 text-discord-red">Danger Zone</h2>
                      
                      <div className="space-y-6">
                        <div className="p-4 bg-discord-red/10 border border-discord-red/30 rounded-md">
                          <div className="flex items-center mb-2">
                            <AlertTriangle size={16} className="text-discord-red mr-2" />
                            <h3 className="font-medium">Warning</h3>
                          </div>
                          <p className="text-sm text-gray-400">
                            The actions below are potentially destructive and may result in data loss or service interruption.
                          </p>
                        </div>
                        
                        <div className="p-4 border border-gray-700 rounded-md">
                          <h3 className="font-medium mb-2">Restart Bot</h3>
                          <p className="text-sm text-gray-400 mb-3">
                            Restart the bot process. This will briefly interrupt service and the bot will go offline for a few moments.
                          </p>
                          <button 
                            className="btn btn-outline text-discord-yellow border-discord-yellow hover:bg-discord-yellow hover:text-black"
                            onClick={() => setRestartConfirm(true)}
                          >
                            Restart Bot
                          </button>
                        </div>
                        
                        <div className="p-4 border border-gray-700 rounded-md">
                          <h3 className="font-medium mb-2">Clear Cache</h3>
                          <p className="text-sm text-gray-400 mb-3">
                            Clear the bot's cache. This can help resolve some issues but may cause temporary slowdowns.
                          </p>
                          <button className="btn btn-outline text-discord-yellow border-discord-yellow hover:bg-discord-yellow hover:text-black">
                            Clear Cache
                          </button>
                        </div>
                        
                        <div className="p-4 border border-gray-700 rounded-md">
                          <h3 className="font-medium mb-2">Reset All Settings</h3>
                          <p className="text-sm text-gray-400 mb-3">
                            Reset all bot settings to their default values. This will not delete your data but will remove all customizations.
                          </p>
                          <button className="btn btn-outline text-discord-red border-discord-red hover:bg-discord-red hover:text-white">
                            Reset Settings
                          </button>
                        </div>
                        
                        <div className="p-4 border border-gray-700 rounded-md">
                          <h3 className="font-medium mb-2">Disconnect From All Servers</h3>
                          <p className="text-sm text-gray-400 mb-3">
                            Remove the bot from all connected Discord servers. You will need to re-invite the bot to each server.
                          </p>
                          <button className="btn btn-outline text-discord-red border-discord-red hover:bg-discord-red hover:text-white">
                            Disconnect From All Servers
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Restart Confirmation Modal */}
      {restartConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-discord-darker rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Confirm Restart</h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to restart the bot? This will temporarily disconnect the bot from all servers.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setRestartConfirm(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // Handle restart logic here
                  setRestartConfirm(false);
                }}
                className="btn bg-discord-yellow text-black hover:bg-opacity-80"
              >
                Restart Bot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
 