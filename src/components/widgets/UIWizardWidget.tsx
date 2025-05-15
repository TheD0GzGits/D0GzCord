import  React, { useState } from 'react';
import { Layout } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useServerContext } from '../../contexts/ServerContext';

interface UIWizardWidgetProps {
  serverId: string;
  config: any;
  onConfigChange: (config: any) => void;
}

interface PresetTheme {
  id: string;
  name: string;
  primaryColor: string;
  background: string;
  preview: React.ReactNode;
}

const UIWizardWidget: React.FC<UIWizardWidgetProps> = ({ serverId, config, onConfigChange }) => {
  const navigate = useNavigate();
  const { currentServer } = useServerContext();
  const [selectedTheme, setSelectedTheme] = useState(config.activeTheme || 'default');
  
  const presetThemes: PresetTheme[] = [
    {
      id: 'default',
      name: 'Discord Default',
      primaryColor: '#5865F2',
      background: '#36393F',
      preview: (
        <div className="h-10 rounded overflow-hidden" 
          style={{ background: 'linear-gradient(to right, #5865F2, #36393F)' }}
        ></div>
      )
    },
    {
      id: 'midnight',
      name: 'Midnight Blue',
      primaryColor: '#0D2137',
      background: '#0E2A47',
      preview: (
        <div className="h-10 rounded overflow-hidden" 
          style={{ background: 'linear-gradient(to right, #66B2FF, #0D2137)' }}
        ></div>
      )
    },
    {
      id: 'purple',
      name: 'Purple Haze',
      primaryColor: '#9B59B6',
      background: '#2D2040',
      preview: (
        <div className="h-10 rounded overflow-hidden" 
          style={{ background: 'linear-gradient(to right, #9B59B6, #2D2040)' }}
        ></div>
      )
    },
    {
      id: 'forest',
      name: 'Forest',
      primaryColor: '#2ECC71',
      background: '#1A2C2A',
      preview: (
        <div className="h-10 rounded overflow-hidden" 
          style={{ background: 'linear-gradient(to right, #2ECC71, #1A2C2A)' }}
        ></div>
      )
    }
  ];

  const backgroundImages = [
    { 
      id: 'mountain-pink',
      src: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-4.1.0&fit=fillmax&h=400&w=800',
      name: 'Pink Mountains'
    },
    { 
      id: 'valley-dark',
      src: 'https://images.unsplash.com/photo-1504217051514-96afa06398be?ixlib=rb-4.1.0&fit=fillmax&h=400&w=800',
      name: 'Godaland Valley'
    },
    { 
      id: 'forest-blue',
      src: 'https://images.unsplash.com/photo-1484591974057-265bb767ef71?ixlib=rb-4.1.0&fit=fillmax&h=400&w=800',
      name: 'Blue Forest'
    }
  ];
  
  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    onConfigChange({
      ...config,
      activeTheme: themeId
    });
  };
  
  const handleOpenUIEditor = () => {
    navigate('/ui-wizard');
  };
  
  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Layout size={20} className="mr-2 text-discord-blue" />
        UI Wizard
      </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Theme Presets</h3>
          <div className="grid grid-cols-2 gap-3">
            {presetThemes.map(theme => (
              <div
                key={theme.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedTheme === theme.id 
                    ? 'border-discord-blue' 
                    : 'border-gray-700 hover:border-gray-500'
                }`}
                onClick={() => handleThemeSelect(theme.id)}
              >
                {theme.preview}
                <div className="mt-2 text-sm font-medium">{theme.name}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Background Images</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {backgroundImages.map(image => (
              <div 
                key={image.id}
                className="h-20 rounded-lg overflow-hidden cursor-pointer border border-gray-700 hover:border-discord-blue"
              >
                <img 
                  src={image.src} 
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-2">
          <button
            className="w-full btn btn-primary"
            onClick={handleOpenUIEditor}
          >
            Open UI Wizard
          </button>
          <p className="mt-2 text-sm text-gray-400">
            Customize your server's appearance with advanced controls
          </p>
        </div>
      </div>
    </div>
  );
};

export default UIWizardWidget;
 