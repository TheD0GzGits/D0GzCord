import  { useState } from 'react';
import { MessageCircle } from 'lucide-react';

interface WelcomeWidgetProps {
  serverId: string;
  config: any;
  onConfigChange: (config: any) => void;
}

const WelcomeWidget: React.FC<WelcomeWidgetProps> = ({ serverId, config, onConfigChange }) => {
  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <MessageCircle size={20} className="mr-2 text-discord-green" />
        Welcome Messages
      </h2>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="welcome-message" className="block text-sm font-medium text-gray-300 mb-1">
            Welcome Message
          </label>
          <textarea 
            id="welcome-message" 
            value={config.message}
            onChange={(e) => onConfigChange({ ...config, message: e.target.value })}
            className="input min-h-[100px]"
            placeholder="Enter the message to send when a new user joins"
          />
          <p className="mt-1 text-sm text-gray-400">
            You can use variables like {'{user}'} to mention the new member
          </p>
        </div>
        
        <div>
          <label htmlFor="welcome-channel" className="block text-sm font-medium text-gray-300 mb-1">
            Welcome Channel
          </label>
          <select 
            id="welcome-channel" 
            value={config.channelId}
            onChange={(e) => onConfigChange({ ...config, channelId: e.target.value })}
            className="input"
          >
            <option value="">Select a channel</option>
            <option value="channel2">welcome</option>
            <option value="channel3">general</option>
            <option value="channel4">stream-announcements</option>
          </select>
          <p className="mt-1 text-sm text-gray-400">
            The channel where welcome messages will be sent
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="send-dm" 
              checked={config.sendDM || false}
              onChange={() => onConfigChange({ ...config, sendDM: !config.sendDM })}
              className="h-4 w-4 text-discord-blue focus:ring-discord-blue border-gray-500 rounded"
            />
            <label htmlFor="send-dm" className="ml-2 block text-sm text-gray-300">
              Send welcome message as a direct message
            </label>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="mention-user" 
              checked={config.mentionUser || false}
              onChange={() => onConfigChange({ ...config, mentionUser: !config.mentionUser })}
              className="h-4 w-4 text-discord-blue focus:ring-discord-blue border-gray-500 rounded"
            />
            <label htmlFor="mention-user" className="ml-2 block text-sm text-gray-300">
              Mention user in welcome message
            </label>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="enabled" 
              checked={config.enabled || false}
              onChange={() => onConfigChange({ ...config, enabled: !config.enabled })}
              className="h-4 w-4 text-discord-blue focus:ring-discord-blue border-gray-500 rounded"
            />
            <label htmlFor="enabled" className="ml-2 block text-sm text-gray-300">
              Enable welcome messages
            </label>
          </div>
        </div>
        
        <div className="bg-gray-800 dark:bg-discord-darkest p-4 rounded-md">
          <h3 className="font-medium mb-2">Message Preview</h3>
          <div className="bg-discord-dark p-3 rounded-md">
            <div className="flex items-start">
              <img 
                src="https://i.pravatar.cc/150?img=3" 
                alt="Bot" 
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <div className="flex items-center">
                  <span className="font-medium text-discord-blue mr-1">D0GzBot</span>
                  <span className="text-xs px-1 py-0.5 bg-discord-blue text-white rounded">BOT</span>
                </div>
                <p className="text-sm mt-1">
                  {config.mentionUser ? '@NewUser ' : ''}
                  {config.message.replace('{user}', 'NewUser')}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-4">
          <button 
            className="btn btn-primary w-full"
            onClick={() => {
              console.log('Saving welcome message configuration:', config);
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeWidget;
 