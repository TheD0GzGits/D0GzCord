import  { useState } from 'react';
import { Video, Trash, Bell } from 'lucide-react';

interface TwitchWidgetProps {
  serverId: string;
  config: any;
  onConfigChange: (config: any) => void;
}

interface TwitchAccount {
  id: string;
  username: string;
  notificationMessage: string;
}

const TwitchWidget: React.FC<TwitchWidgetProps> = ({ serverId, config, onConfigChange }) => {
  const [accounts, setAccounts] = useState<TwitchAccount[]>(config.twitchAccounts || []);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showStreamPopup, setShowStreamPopup] = useState(false);
  const [newAccount, setNewAccount] = useState<Partial<TwitchAccount>>({
    username: '',
    notificationMessage: '{username} is now live: {title}! Watch at {url}'
  });
  
  const handleDeleteAccount = (accountId: string) => {
    const updatedAccounts = accounts.filter(account => account.id !== accountId);
    setAccounts(updatedAccounts);
    onConfigChange({
      ...config,
      twitchAccounts: updatedAccounts
    });
  };
  
  const handleAddAccount = () => {
    if (!newAccount.username) return;
    
    const newAccountWithId: TwitchAccount = {
      id: `twitch${Date.now()}`,
      username: newAccount.username || '',
      notificationMessage: newAccount.notificationMessage || '{username} is now live: {title}! Watch at {url}'
    };
    
    const updatedAccounts = [...accounts, newAccountWithId];
    setAccounts(updatedAccounts);
    onConfigChange({
      ...config,
      twitchAccounts: updatedAccounts
    });
    
    setNewAccount({
      username: '',
      notificationMessage: '{username} is now live: {title}! Watch at {url}'
    });
    setShowAddAccount(false);
  };
  
  const handleSettingsChange = (key: string, value: any) => {
    onConfigChange({
      ...config,
      [key]: value
    });
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Video size={20} className="mr-2 text-discord-purple" />
          Twitch Integration
        </h2>
        <div className="flex items-center">
          <div 
            className="w-10 h-5 rounded-full relative cursor-pointer"
            style={{ backgroundColor: config.notificationsEnabled ? '#5865F2' : '#72767d' }}
            onClick={() => handleSettingsChange('notificationsEnabled', !config.notificationsEnabled)}
          >
            <div 
              className="w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform"
              style={{ transform: config.notificationsEnabled ? 'translateX(20px)' : 'translateX(2px)' }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="notification-channel" className="block text-sm font-medium text-gray-300 mb-1">
            Notification Channel
          </label>
          <select
            id="notification-channel"
            value={config.channelId}
            onChange={(e) => handleSettingsChange('channelId', e.target.value)}
            className="input"
            disabled={!config.notificationsEnabled}
          >
            <option value="">Select a channel</option>
            <option value="channel4">stream-announcements</option>
            <option value="channel3">general</option>
          </select>
          <p className="mt-1 text-sm text-gray-400">
            The channel where stream notifications will be sent
          </p>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Twitch Channels</h3>
            <button 
              className="btn btn-primary btn-sm flex items-center"
              onClick={() => setShowAddAccount(true)}
            >
              <span className="text-sm mr-1">+</span> Add Channel
            </button>
          </div>
          
          {accounts.length === 0 ? (
            <div className="bg-discord-darkest rounded-md p-4 text-center">
              <p className="text-gray-400">No Twitch channels added yet.</p>
              <button 
                className="btn btn-primary mt-3"
                onClick={() => setShowAddAccount(true)}
              >
                Add Twitch Channel
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {accounts.map(account => (
                <div key={account.id} className="bg-discord-darkest rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${account.username}&background=9147ff&color=fff`} 
                        alt={account.username}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span className="font-medium">{account.username}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        className="p-1 text-gray-400 hover:text-discord-red transition-colors"
                        onClick={() => handleDeleteAccount(account.id)}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    <div className="truncate">{account.notificationMessage}</div>
                  </div>
                  
                  <div className="mt-2">
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => setShowStreamPopup(true)}
                    >
                      Preview Notification
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="mirror-chat"
              checked={config.mirrorChat || false}
              onChange={(e) => handleSettingsChange('mirrorChat', e.target.checked)}
              className="h-4 w-4 text-discord-blue focus:ring-discord-blue border-gray-500 rounded"
            />
            <label htmlFor="mirror-chat" className="ml-2 block text-sm text-gray-300">
              Mirror Twitch chat in Discord
            </label>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-4">
          <button 
            className="btn btn-primary w-full"
            onClick={() => {
              console.log('Saving Twitch integration settings:', config);
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
      
      {/* Add Account Modal */}
      {showAddAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-discord-darker rounded-lg w-full max-w-md p-6">
            <h3 className="text-xl font-semibold mb-4">Add Twitch Channel</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="twitch-username" className="block text-sm font-medium text-gray-300 mb-1">
                  Twitch Username
                </label>
                <input
                  id="twitch-username"
                  type="text"
                  className="input"
                  value={newAccount.username}
                  onChange={(e) => setNewAccount({ ...newAccount, username: e.target.value })}
                  placeholder="Enter Twitch username"
                />
              </div>
              
              <div>
                <label htmlFor="notification-message" className="block text-sm font-medium text-gray-300 mb-1">
                  Notification Message
                </label>
                <textarea
                  id="notification-message"
                  className="input min-h-[80px]"
                  value={newAccount.notificationMessage}
                  onChange={(e) => setNewAccount({ ...newAccount, notificationMessage: e.target.value })}
                  placeholder="Notification message when streamer goes live"
                />
                <p className="mt-1 text-sm text-gray-400">
                  You can use variables: {'{username}'}, {'{title}'}, {'{game}'}, {'{url}'}
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setShowAddAccount(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddAccount}
                className="btn btn-primary"
                disabled={!newAccount.username}
              >
                Add Channel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Stream Notification Preview */}
      {showStreamPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-discord-darker rounded-lg w-full max-w-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Stream Notification Preview</h3>
            
            <div className="bg-discord-dark rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <img
                  src="/bot-avatar.png"
                  alt="Bot"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-medium text-discord-blue mr-2">D0GzBot</span>
                    <span className="text-xs px-1 py-0.5 bg-discord-blue text-white rounded">BOT</span>
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex items-center">
                      <Bell size={16} className="mr-2 text-discord-purple" />
                      <span className="font-medium">Twitch Notification</span>
                    </div>
                    
                    <div className="mt-2 border border-discord-purple rounded-md overflow-hidden">
                      <div className="bg-purple-900 bg-opacity-30 p-3">
                        <div className="flex items-center">
                          <img 
                            src={`https://ui-avatars.com/api/?name=${accounts[0]?.username || 'Streamer'}&background=9147ff&color=fff`}
                            alt="Streamer"
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          <div>
                            <div className="font-semibold">{accounts[0]?.username || 'Streamer'}</div>
                            <div className="text-xs text-gray-300">Playing Minecraft</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3">
                        <h4 className="font-medium">Building an Epic Castle!</h4>
                        <p className="text-sm text-gray-300 mt-1">
                          {(accounts[0]?.notificationMessage || '{username} is now live: {title}! Watch at {url}')
                            .replace('{username}', accounts[0]?.username || 'Streamer')
                            .replace('{title}', 'Building an Epic Castle!')
                            .replace('{game}', 'Minecraft')
                            .replace('{url}', 'https://twitch.tv/' + (accounts[0]?.username || 'streamer'))}
                        </p>
                        
                        <div className="mt-4">
                          <button className="btn btn-primary">
                            Watch Stream
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-3 flex justify-end">
              <button 
                onClick={() => setShowStreamPopup(false)}
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

export default TwitchWidget;
 