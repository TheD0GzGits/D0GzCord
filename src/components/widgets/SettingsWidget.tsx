import  { useState } from 'react';
import { Settings } from 'lucide-react';

interface SettingsWidgetProps {
  serverId: string;
  config: any;
  onConfigChange: (config: any) => void;
}

const SettingsWidget = ({ serverId, config, onConfigChange }: SettingsWidgetProps) => {
  const [localConfig, setLocalConfig] = useState(config);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleSaveChanges = () => {
    onConfigChange(localConfig);
  };
  
  if (!isExpanded) {
    return (
      <div className="card">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Settings size={20} className="mr-2 text-discord-red" />
              Bot Settings
            </h2>
            <button 
              className="btn btn-outline px-3 py-1"
              onClick={() => setIsExpanded(true)}
            >
              Expand
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Command Prefix</div>
                <div className="text-sm text-gray-400">Current: {localConfig.prefix}</div>
              </div>
              <div className="bg-discord-darkest px-2 py-1 rounded">
                {localConfig.prefix}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Logging</div>
                <div className="text-sm text-gray-400">
                  {localConfig.loggingEnabled ? 'Enabled' : 'Disabled'}
                </div>
              </div>
              <div className={`w-10 h-5 rounded-full ${localConfig.loggingEnabled ? 'bg-discord-blue' : 'bg-gray-700'} relative`}>
                <div 
                  className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                    localConfig.loggingEnabled ? 'translate-x-5' : 'translate-x-0.5'
                  }`} 
                ></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Automod</div>
                <div className="text-sm text-gray-400">
                  {localConfig.moderationEnabled ? 'Enabled' : 'Disabled'}
                </div>
              </div>
              <div className={`w-10 h-5 rounded-full ${localConfig.moderationEnabled ? 'bg-discord-blue' : 'bg-gray-700'} relative`}>
                <div 
                  className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                    localConfig.moderationEnabled ? 'translate-x-5' : 'translate-x-0.5'
                  }`} 
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="card col-span-1 lg:col-span-2">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <Settings size={20} className="mr-2 text-discord-red" />
            Bot Settings
          </h2>
          <button 
            className="btn btn-outline px-3 py-1"
            onClick={() => setIsExpanded(false)}
          >
            Collapse
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">General Settings</h3>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="prefix" className="block text-sm font-medium text-gray-300 mb-1">
                  Command Prefix
                </label>
                <div className="flex">
                  <input
                    id="prefix"
                    type="text"
                    value={localConfig.prefix}
                    onChange={(e) => setLocalConfig({
                      ...localConfig,
                      prefix: e.target.value
                    })}
                    className="input w-24"
                    maxLength={3}
                  />
                </div>
                <p className="mt-1 text-sm text-gray-400">
                  Character(s) that will trigger bot commands
                </p>
              </div>
              
              <div>
                <label htmlFor="logChannel" className="block text-sm font-medium text-gray-300 mb-1">
                  Logging Channel
                </label>
                <select
                  id="logChannel"
                  value={localConfig.logChannelId}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    logChannelId: e.target.value
                  })}
                  className="input"
                  disabled={!localConfig.loggingEnabled}
                >
                  <option value="">Select a channel</option>
                  <option value="channel3">general</option>
                  <option value="channel1">rules</option>
                  <option value="channel5">bot-commands</option>
                </select>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enable-logging"
                    checked={localConfig.loggingEnabled}
                    onChange={(e) => setLocalConfig({
                      ...localConfig,
                      loggingEnabled: e.target.checked
                    })}
                    className="h-4 w-4 text-discord-blue focus:ring-discord-blue border-gray-500 rounded"
                  />
                  <label htmlFor="enable-logging" className="ml-2 block text-sm text-gray-300">
                    Enable logging
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enable-moderation"
                    checked={localConfig.moderationEnabled}
                    onChange={(e) => setLocalConfig({
                      ...localConfig,
                      moderationEnabled: e.target.checked
                    })}
                    className="h-4 w-4 text-discord-blue focus:ring-discord-blue border-gray-500 rounded"
                  />
                  <label htmlFor="enable-moderation" className="ml-2 block text-sm text-gray-300">
                    Enable moderation features
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Auto Moderation</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="filter-spam"
                  checked={localConfig.automodSettings?.filterSpam || false}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    automodSettings: {
                      ...localConfig.automodSettings,
                      filterSpam: e.target.checked
                    }
                  })}
                  className="h-4 w-4 text-discord-blue focus:ring-discord-blue border-gray-500 rounded"
                  disabled={!localConfig.moderationEnabled}
                />
                <label htmlFor="filter-spam" className="ml-2 block text-sm text-gray-300">
                  Filter spam messages
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="filter-invites"
                  checked={localConfig.automodSettings?.filterInvites || false}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    automodSettings: {
                      ...localConfig.automodSettings,
                      filterInvites: e.target.checked
                    }
                  })}
                  className="h-4 w-4 text-discord-blue focus:ring-discord-blue border-gray-500 rounded"
                  disabled={!localConfig.moderationEnabled}
                />
                <label htmlFor="filter-invites" className="ml-2 block text-sm text-gray-300">
                  Filter Discord invites
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="filter-links"
                  checked={localConfig.automodSettings?.filterLinks || false}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    automodSettings: {
                      ...localConfig.automodSettings,
                      filterLinks: e.target.checked
                    }
                  })}
                  className="h-4 w-4 text-discord-blue focus:ring-discord-blue border-gray-500 rounded"
                  disabled={!localConfig.moderationEnabled}
                />
                <label htmlFor="filter-links" className="ml-2 block text-sm text-gray-300">
                  Filter external links
                </label>
              </div>
              
              <div className="pt-4">
                <label htmlFor="custom-words" className="block text-sm font-medium text-gray-300 mb-1">
                  Custom Filtered Words
                </label>
                <textarea
                  id="custom-words"
                  className="input min-h-[80px]"
                  placeholder="Add words separated by commas"
                  disabled={!localConfig.moderationEnabled}
                ></textarea>
                <p className="mt-1 text-sm text-gray-400">
                  Messages containing these words will be deleted
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 border-t border-gray-700 pt-6 flex justify-end">
          <button 
            className="btn btn-primary"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsWidget;
 