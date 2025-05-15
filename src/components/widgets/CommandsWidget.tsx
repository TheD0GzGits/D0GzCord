import  { useState } from 'react';
import { Terminal, Plus, X, Edit } from 'lucide-react';
import { Command } from '../../types';

interface CommandsWidgetProps {
  serverId: string;
  config: any;
  onConfigChange: (config: any) => void;
}

const CommandsWidget = ({ serverId, config, onConfigChange }: CommandsWidgetProps) => {
  const [commands, setCommands] = useState<Command[]>(config.commands || []);
  const [showAddCommand, setShowAddCommand] = useState(false);
  const [editingCommand, setEditingCommand] = useState<Command | null>(null);
  const [newCommand, setNewCommand] = useState<Partial<Command>>({
    name: '',
    description: '',
    usage: '',
    enabled: true,
    permissions: [],
    cooldown: 0
  });
  
  const handleDeleteCommand = (commandId: string) => {
    const updatedCommands = commands.filter(cmd => cmd.id !== commandId);
    setCommands(updatedCommands);
    onConfigChange({ ...config, commands: updatedCommands });
  };
  
  const handleEditCommand = (command: Command) => {
    setEditingCommand(command);
    setNewCommand(command);
    setShowAddCommand(true);
  };
  
  const handleSaveCommand = () => {
    if (!newCommand.name || !newCommand.description) {
      return;
    }
    
    let updatedCommands;
    
    if (editingCommand) {
      // Update existing command
      updatedCommands = commands.map(cmd => {
        if (cmd.id === editingCommand.id) {
          return { ...newCommand, id: cmd.id } as Command;
        }
        return cmd;
      });
    } else {
      // Add new command
      const newCommandWithId = {
        ...newCommand,
        id: `cmd${Date.now()}`
      } as Command;
      
      updatedCommands = [...commands, newCommandWithId];
    }
    
    setCommands(updatedCommands);
    onConfigChange({ ...config, commands: updatedCommands });
    setShowAddCommand(false);
    setEditingCommand(null);
    setNewCommand({
      name: '',
      description: '',
      usage: '',
      enabled: true,
      permissions: [],
      cooldown: 0
    });
  };
  
  const handlePermissionChange = (permission: string) => {
    const currentPermissions = newCommand.permissions || [];
    const updatedPermissions = currentPermissions.includes(permission)
      ? currentPermissions.filter(p => p !== permission)
      : [...currentPermissions, permission];
    
    setNewCommand({
      ...newCommand,
      permissions: updatedPermissions
    });
  };

  return (
    <div className="card">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Terminal size={20} className="mr-2 text-discord-blue" />
            Custom Commands
          </h2>
          
          <button 
            className="btn btn-primary flex items-center"
            onClick={() => {
              setShowAddCommand(true);
              setEditingCommand(null);
              setNewCommand({
                name: '',
                description: '',
                usage: '',
                enabled: true,
                permissions: [],
                cooldown: 0
              });
            }}
          >
            <Plus size={16} className="mr-1" />
            Add Command
          </button>
        </div>
        
        {commands.length === 0 ? (
          <div className="bg-discord-darkest rounded-lg p-6 text-center">
            <p className="text-gray-400 mb-4">No custom commands have been created yet.</p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setShowAddCommand(true);
                setEditingCommand(null);
              }}
            >
              Create Your First Command
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {commands.map(command => (
              <div key={command.id} className="bg-discord-darkest rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="font-semibold text-discord-blue">{config.prefix || '!'}{command.name}</span>
                    {!command.enabled && (
                      <span className="ml-2 text-xs px-1.5 py-0.5 bg-gray-700 text-gray-300 rounded">Disabled</span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      className="p-1 hover:text-discord-blue transition-colors"
                      onClick={() => handleEditCommand(command)}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="p-1 hover:text-discord-red transition-colors"
                      onClick={() => handleDeleteCommand(command.id)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-300">{command.description}</p>
                
                <div className="mt-2 text-xs text-gray-400">
                  Usage: <span className="font-mono">{command.usage}</span>
                </div>
                
                {command.permissions.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {command.permissions.map(permission => (
                      <span key={permission} className="text-xs px-1.5 py-0.5 bg-discord-darker text-gray-300 rounded">
                        {permission}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {showAddCommand && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-discord-darker rounded-lg w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">
                  {editingCommand ? 'Edit Command' : 'Add Command'}
                </h3>
                <button 
                  className="text-gray-400 hover:text-white"
                  onClick={() => {
                    setShowAddCommand(false);
                    setEditingCommand(null);
                  }}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="cmd-name" className="block text-sm font-medium text-gray-300 mb-1">
                    Command Name
                  </label>
                  <input
                    id="cmd-name"
                    type="text"
                    className="input"
                    value={newCommand.name}
                    onChange={(e) => setNewCommand({ ...newCommand, name: e.target.value })}
                    placeholder="help"
                  />
                </div>
                
                <div>
                  <label htmlFor="cmd-description" className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                  </label>
                  <input
                    id="cmd-description"
                    type="text"
                    className="input"
                    value={newCommand.description}
                    onChange={(e) => setNewCommand({ ...newCommand, description: e.target.value })}
                    placeholder="Shows a list of available commands"
                  />
                </div>
                
                <div>
                  <label htmlFor="cmd-usage" className="block text-sm font-medium text-gray-300 mb-1">
                    Usage
                  </label>
                  <input
                    id="cmd-usage"
                    type="text"
                    className="input"
                    value={newCommand.usage}
                    onChange={(e) => setNewCommand({ ...newCommand, usage: e.target.value })}
                    placeholder="!help [command]"
                  />
                </div>
                
                <div>
                  <label htmlFor="cmd-cooldown" className="block text-sm font-medium text-gray-300 mb-1">
                    Cooldown (seconds)
                  </label>
                  <input
                    id="cmd-cooldown"
                    type="number"
                    className="input"
                    min="0"
                    value={newCommand.cooldown}
                    onChange={(e) => setNewCommand({ ...newCommand, cooldown: parseInt(e.target.value) || 0 })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Required Permissions
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['ADMINISTRATOR', 'MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS', 'MANAGE_ROLES'].map(permission => (
                      <div key={permission} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`perm-${permission}`}
                          checked={(newCommand.permissions || []).includes(permission)}
                          onChange={() => handlePermissionChange(permission)}
                          className="h-4 w-4 text-discord-blue focus:ring-discord-blue border-gray-500 rounded"
                        />
                        <label htmlFor={`perm-${permission}`} className="ml-2 block text-sm text-gray-300">
                          {permission}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="cmd-enabled"
                    checked={newCommand.enabled}
                    onChange={(e) => setNewCommand({ ...newCommand, enabled: e.target.checked })}
                    className="h-4 w-4 text-discord-blue focus:ring-discord-blue border-gray-500 rounded"
                  />
                  <label htmlFor="cmd-enabled" className="ml-2 block text-sm text-gray-300">
                    Command enabled
                  </label>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => {
                    setShowAddCommand(false);
                    setEditingCommand(null);
                  }}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveCommand}
                  className="btn btn-primary"
                  disabled={!newCommand.name || !newCommand.description}
                >
                  {editingCommand ? 'Update' : 'Add'} Command
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandsWidget;
 