import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Eye, EyeOff, Layout, Image, RefreshCw, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
 
import { useServerContext } from '../contexts/ServerContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const UIWizard = () => {
  const navigate = useNavigate();
  const { currentServer, updateServerWidget } = useServerContext();
  const [currentStyles, setCurrentStyles] = useState(
    currentServer.widgets.uiWizard.config.savedStyles || {}
  );
  const [activeSection, setActiveSection] = useState('global');
  const [showPreview, setShowPreview] = useState(true);
  
  const sections = [
    { id: 'global', name: 'Global Theme' },
    { id: 'colors', name: 'Colors' },
    { id: 'channels', name: 'Channels' },
    { id: 'chat', name: 'Chat' },
    { id: 'members', name: 'Member List' },
    { id: 'buttons', name: 'Buttons & Controls' }
  ];
  
  const colorOptions = [
    { id: 'discord-blue', color: '#5865F2', name: 'Discord Blue' },
    { id: 'discord-green', color: '#57F287', name: 'Discord Green' },
    { id: 'discord-yellow', color: '#FEE75C', name: 'Discord Yellow' },
    { id: 'discord-purple', color: '#9B59B6', name: 'Discord Purple' },
    { id: 'discord-red', color: '#ED4245', name: 'Discord Red' },
    { id: 'cyan-500', color: '#06B6D4', name: 'Cyan' },
    { id: 'emerald-500', color: '#10B981', name: 'Emerald' },
    { id: 'amber-500', color: '#F59E0B', name: 'Amber' },
    { id: 'rose-500', color: '#F43F5E', name: 'Rose' }
  ];
  
  const backgroundOptions = [
    { id: 'dark', name: 'Dark', preview: '#36393F' },
    { id: 'darker', name: 'Darker', preview: '#2F3136' },
    { id: 'darkest', name: 'Darkest', preview: '#202225' },
    { id: 'black', name: 'Black', preview: '#000000' },
    { id: 'midnight-blue', name: 'Midnight Blue', preview: '#0D2137' },
    { id: 'purple-haze', name: 'Purple Haze', preview: '#2D2040' },
    { id: 'emerald-dark', name: 'Emerald Dark', preview: '#1A2C2A' }
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
      id: 'cliff-green',
      src: 'https://images.unsplash.com/photo-1433190152045-5a94184895da?ixlib=rb-4.1.0&fit=fillmax&h=400&w=800',
      name: 'Green Cliffs'
    },
    { 
      id: 'forest-blue',
      src: 'https://images.unsplash.com/photo-1484591974057-265bb767ef71?ixlib=rb-4.1.0&fit=fillmax&h=400&w=800',
      name: 'Blue Forest'
    }
  ];
  
  const handleColorChange = (element: string, color: string) => {
    setCurrentStyles({
      ...currentStyles,
      [element]: color
    });
  };
  
  const handleSaveChanges = () => {
    const updatedConfig = {
      ...currentServer.widgets.uiWizard.config,
      savedStyles: currentStyles
    };
    
    updateServerWidget(currentServer.id, 'uiWizard', { config: updatedConfig });
    navigate('/');
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden bg-discord-dark">
        <Header />
        
        <main className="flex-1 overflow-hidden flex">
          {/* UI Editor */}
          <div className={`${showPreview ? 'w-1/2' : 'w-full'} border-r border-gray-700 flex flex-col overflow-hidden`}>
            <div className="bg-discord-darker p-4 border-b border-gray-700 flex justify-between items-center">
              <h1 className="text-xl font-bold">UI Wizard</h1>
              <div className="flex items-center space-x-2">
                <button 
                  className="p-2 rounded-md hover:bg-discord-dark transition-colors"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  {showPreview ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <button 
                  className="btn btn-primary flex items-center"
                  onClick={handleSaveChanges}
                >
                  <Save size={16} className="mr-1" />
                  Save
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-hidden flex">
              {/* Sections Nav */}
              <div className="w-48 bg-discord-darkest p-3 overflow-y-auto">
                {sections.map(section => (
                  <button
                    key={section.id}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeSection === section.id
                        ? 'bg-discord-blue text-white'
                        : 'text-gray-300 hover:bg-discord-dark hover:text-white'
                    }`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.name}
                  </button>
                ))}
              </div>
              
              {/* Section Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {activeSection === 'global' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold mb-3">Theme Presets</h2>
                      <div className="grid grid-cols-2 gap-3">
                        <button 
                          className="p-3 bg-discord-dark rounded-lg border border-discord-blue flex flex-col items-center"
                          onClick={() => {
                            setCurrentStyles({
                              'chat-background': '#36393F',
                              'chat-text': '#FFFFFF',
                              'channel-text': '#8E9297',
                              'channel-active': '#FFFFFF',
                              'sidebar-bg': '#2F3136',
                              'header-bg': '#36393F',
                              'member-list-bg': '#2F3136',
                              'input-bg': '#40444B'
                            });
                          }}
                        >
                          <div 
                            className="w-full h-8 rounded mb-2" 
                            style={{ 
                              background: 'linear-gradient(to right, #5865F2, #36393F)' 
                            }}
                          ></div>
                          <span className="text-sm">Discord Dark</span>
                        </button>
                        
                        <button 
                          className="p-3 bg-discord-darkest rounded-lg border border-gray-700 hover:border-gray-500 flex flex-col items-center"
                          onClick={() => {
                            setCurrentStyles({
                              'chat-background': '#1E1E1E',
                              'chat-text': '#CCCCCC',
                              'channel-text': '#6B8BFF',
                              'channel-active': '#FFFFFF',
                              'sidebar-bg': '#252526',
                              'header-bg': '#1E1E1E',
                              'member-list-bg': '#252526',
                              'input-bg': '#3C3C3C'
                            });
                          }}
                        >
                          <div 
                            className="w-full h-8 rounded mb-2" 
                            style={{ 
                              background: 'linear-gradient(to right, #6B8BFF, #1E1E1E)' 
                            }}
                          ></div>
                          <span className="text-sm">Dark Coder</span>
                        </button>
                        
                        <button 
                          className="p-3 bg-discord-darkest rounded-lg border border-gray-700 hover:border-gray-500 flex flex-col items-center"
                          onClick={() => {
                            setCurrentStyles({
                              'chat-background': '#0D2137',
                              'chat-text': '#E0F2FE',
                              'channel-text': '#7DD3FC',
                              'channel-active': '#FFFFFF',
                              'sidebar-bg': '#082F49',
                              'header-bg': '#0E2A47',
                              'member-list-bg': '#0E2A47',
                              'input-bg': '#164E63'
                            });
                          }}
                        >
                          <div 
                            className="w-full h-8 rounded mb-2" 
                            style={{ 
                              background: 'linear-gradient(to right, #66B2FF, #0D2137)' 
                            }}
                          ></div>
                          <span className="text-sm">Midnight Blue</span>
                        </button>
                        
                        <button 
                          className="p-3 bg-discord-darkest rounded-lg border border-gray-700 hover:border-gray-500 flex flex-col items-center"
                          onClick={() => {
                            setCurrentStyles({
                              'chat-background': '#2D2040',
                              'chat-text': '#F5EBFF',
                              'channel-text': '#C29FFF',
                              'channel-active': '#FFFFFF',
                              'sidebar-bg': '#1F1635',
                              'header-bg': '#2D2040',
                              'member-list-bg': '#2D2040',
                              'input-bg': '#3D2A53'
                            });
                          }}
                        >
                          <div 
                            className="w-full h-8 rounded mb-2" 
                            style={{ 
                              background: 'linear-gradient(to right, #9B59B6, #2D2040)' 
                            }}
                          ></div>
                          <span className="text-sm">Purple Haze</span>
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-semibold mb-3">Reset Options</h2>
                      <div className="flex space-x-3">
                        <button 
                          className="btn btn-outline flex items-center"
                          onClick={() => {
                            setCurrentStyles(currentServer.widgets.uiWizard.config.savedStyles || {});
                          }}
                        >
                          <RefreshCw size={16} className="mr-1" />
                          Reset to Saved
                        </button>
                        <button 
                          className="btn btn-outline flex items-center"
                          onClick={() => {
                            setCurrentStyles({
                              'chat-background': '#36393F',
                              'chat-text': '#FFFFFF',
                              'channel-text': '#8E9297',
                              'channel-active': '#FFFFFF',
                              'sidebar-bg': '#2F3136',
                              'header-bg': '#36393F',
                              'member-list-bg': '#2F3136',
                              'input-bg': '#40444B'
                            });
                          }}
                        >
                          <RefreshCw size={16} className="mr-1" />
                          Reset to Default
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-semibold mb-3">Background Image</h2>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div 
                            className="h-24 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-discord-blue"
                            onClick={() => handleColorChange('body-bg-image', 'none')}
                          >
                            <div className="w-full h-full bg-discord-dark flex items-center justify-center">
                              <span className="text-sm text-gray-400">None</span>
                            </div>
                          </div>
                          
                          {backgroundImages.map(image => (
                            <div 
                              key={image.id}
                              className="h-24 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-discord-blue"
                              onClick={() => handleColorChange('body-bg-image', `url(${image.src})`)}
                            >
                              <img 
                                src={image.src}
                                alt={image.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          
                          <div 
                            className="h-24 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-discord-blue flex items-center justify-center bg-discord-darkest"
                          >
                            <div className="flex items-center text-discord-blue">
                              <Image size={16} className="mr-1" />
                              <span className="text-sm">Upload Image</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="bg-opacity" className="block text-sm font-medium text-gray-300 mb-1">
                            Background Opacity: 80%
                          </label>
                          <input 
                            type="range" 
                            id="bg-opacity"
                            min="0"
                            max="100"
                            defaultValue="80"
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeSection === 'colors' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold mb-3">Primary Color</h2>
                      <div className="flex flex-wrap gap-2">
                        {colorOptions.map(option => (
                          <div
                            key={option.id}
                            className="color-item cursor-pointer border-2 border-transparent hover:border-white"
                            style={{ backgroundColor: option.color }}
                            onClick={() => handleColorChange('primary-color', option.color)}
                            title={option.name}
                          ></div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-semibold mb-3">Background Colors</h2>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Main Background
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {backgroundOptions.map(option => (
                              <div
                                key={option.id}
                                className="color-item cursor-pointer border-2 border-transparent hover:border-white"
                                style={{ backgroundColor: option.preview }}
                                onClick={() => handleColorChange('chat-background', option.preview)}
                                title={option.name}
                              ></div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Sidebar Background
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {backgroundOptions.map(option => (
                              <div
                                key={option.id}
                                className="color-item cursor-pointer border-2 border-transparent hover:border-white"
                                style={{ backgroundColor: option.preview }}
                                onClick={() => handleColorChange('sidebar-bg', option.preview)}
                                title={option.name}
                              ></div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Input Field Background
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {backgroundOptions.map(option => (
                              <div
                                key={option.id}
                                className="color-item cursor-pointer border-2 border-transparent hover:border-white"
                                style={{ backgroundColor: option.preview }}
                                onClick={() => handleColorChange('input-bg', option.preview)}
                                title={option.name}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-semibold mb-3">Text Colors</h2>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Primary Text
                          </label>
                          <div className="flex flex-wrap gap-2">
                            <div
                              className="color-item cursor-pointer border-2 border-transparent hover:border-discord-blue"
                              style={{ backgroundColor: '#FFFFFF' }}
                              onClick={() => handleColorChange('chat-text', '#FFFFFF')}
                              title="White"
                            ></div>
                            <div
                              className="color-item cursor-pointer border-2 border-transparent hover:border-discord-blue"
                              style={{ backgroundColor: '#DCDDDE' }}
                              onClick={() => handleColorChange('chat-text', '#DCDDDE')}
                              title="Light Gray"
                            ></div>
                            <div
                              className="color-item cursor-pointer border-2 border-transparent hover:border-discord-blue"
                              style={{ backgroundColor: '#B9BBBE' }}
                              onClick={() => handleColorChange('chat-text', '#B9BBBE')}
                              title="Gray"
                            ></div>
                            <div
                              className="color-item cursor-pointer border-2 border-transparent hover:border-discord-blue"
                              style={{ backgroundColor: '#E0F2FE' }}
                              onClick={() => handleColorChange('chat-text', '#E0F2FE')}
                              title="Light Blue"
                            ></div>
                            <div
                              className="color-item cursor-pointer border-2 border-transparent hover:border-discord-blue"
                              style={{ backgroundColor: '#F5EBFF' }}
                              onClick={() => handleColorChange('chat-text', '#F5EBFF')}
                              title="Light Purple"
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Channel Text (Inactive)
                          </label>
                          <div className="flex flex-wrap gap-2">
                            <div
                              className="color-item cursor-pointer border-2 border-transparent hover:border-discord-blue"
                              style={{ backgroundColor: '#8E9297' }}
                              onClick={() => handleColorChange('channel-text', '#8E9297')}
                              title="Discord Gray"
                            ></div>
                            <div
                              className="color-item cursor-pointer border-2 border-transparent hover:border-discord-blue"
                              style={{ backgroundColor: '#7DD3FC' }}
                              onClick={() => handleColorChange('channel-text', '#7DD3FC')}
                              title="Light Blue"
                            ></div>
                            <div
                              className="color-item cursor-pointer border-2 border-transparent hover:border-discord-blue"
                              style={{ backgroundColor: '#C29FFF' }}
                              onClick={() => handleColorChange('channel-text', '#C29FFF')}
                              title="Light Purple"
                            ></div>
                            <div
                              className="color-item cursor-pointer border-2 border-transparent hover:border-discord-blue"
                              style={{ backgroundColor: '#6EE7B7' }}
                              onClick={() => handleColorChange('channel-text', '#6EE7B7')}
                              title="Light Green"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeSection === 'channels' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold mb-3">Channel Appearance</h2>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Active Channel Style
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <div 
                              className="border-style p-4 bg-discord-dark flex items-center"
                              onClick={() => handleColorChange('channel-active-style', 'default')}
                            >
                              <span className="bg-white w-1 h-8 rounded-r-full mr-2"></span>
                              <span>Default</span>
                            </div>
                            <div 
                              className="border-style p-4 bg-discord-dark flex items-center"
                              onClick={() => handleColorChange('channel-active-style', 'bg-blue')}
                            >
                              <span className="bg-discord-blue h-8 w-full rounded-md opacity-20"></span>
                              <span className="absolute">Background</span>
                            </div>
                            <div 
                              className="border-style p-4 bg-discord-dark flex items-center"
                              onClick={() => handleColorChange('channel-active-style', 'underline')}
                            >
                              <span className="border-b-2 border-discord-blue pb-1">Underline</span>
                            </div>
                            <div 
                              className="border-style p-4 bg-discord-dark flex items-center"
                              onClick={() => handleColorChange('channel-active-style', 'glow')}
                            >
                              <span className="text-discord-blue drop-shadow-[0_0_5px_rgba(88,101,242,0.7)]">Glow</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Category Style
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <div 
                              className="border-style p-4 bg-discord-dark flex items-center"
                              onClick={() => handleColorChange('category-style', 'uppercase')}
                            >
                              <span className="uppercase text-xs">UPPERCASE</span>
                            </div>
                            <div 
                              className="border-style p-4 bg-discord-dark flex items-center"
                              onClick={() => handleColorChange('category-style', 'bordered')}
                            >
                              <span className="text-xs border-b border-gray-600 pb-1 w-full">Bordered</span>
                            </div>
                            <div 
                              className="border-style p-4 bg-discord-dark flex items-center"
                              onClick={() => handleColorChange('category-style', 'bold')}
                            >
                              <span className="text-xs font-bold">Bold Text</span>
                            </div>
                            <div 
                              className="border-style p-4 bg-discord-dark flex items-center"
                              onClick={() => handleColorChange('category-style', 'colored')}
                            >
                              <span className="text-xs text-discord-blue">Colored Text</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-semibold mb-3">Channel Icons</h2>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Icon Style
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          <div 
                            className="border-style"
                            onClick={() => handleColorChange('channel-icon-style', 'default')}
                          >
                            <div className="flex items-center mb-1">
                              <span className="text-gray-400 mr-1">#</span>
                              <span>Default</span>
                            </div>
                          </div>
                          <div 
                            className="border-style"
                            onClick={() => handleColorChange('channel-icon-style', 'colored')}
                          >
                            <div className="flex items-center mb-1">
                              <span className="text-discord-blue mr-1">#</span>
                              <span>Colored</span>
                            </div>
                          </div>
                          <div 
                            className="border-style"
                            onClick={() => handleColorChange('channel-icon-style', 'none')}
                          >
                            <div className="flex items-center mb-1">
                              <span>No Icons</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Live Preview */}
          {showPreview && (
            <div className="w-1/2 flex flex-col overflow-hidden">
              <div className="bg-discord-darker p-4 border-b border-gray-700 flex items-center justify-between">
                <h2 className="font-semibold">Live Preview</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-1 rounded-md text-gray-400 hover:text-white">
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-sm">Chat View</span>
                  <button className="p-1 rounded-md text-gray-400 hover:text-white">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-hidden flex">
                {/* Preview Chat Interface */}
                <div 
                  className="flex flex-col overflow-hidden flex-1"
                  style={{ 
                    backgroundColor: currentStyles['chat-background'] || '#36393F',
                    backgroundImage: currentStyles['body-bg-image'] !== 'none' ? currentStyles['body-bg-image'] : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Chat Header */}
                  <div 
                    className="h-12 flex items-center px-4 border-b border-gray-700"
                    style={{ backgroundColor: currentStyles['header-bg'] || '#36393F' }}
                  >
                    <span className="mr-2 text-gray-400">#</span>
                    <span 
                      className="font-semibold"
                      style={{ color: currentStyles['chat-text'] || '#FFFFFF' }}
                    >
                      general
                    </span>
                  </div>
                  
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="mb-4 flex items-start">
                      <img
                        src="https://i.pravatar.cc/150?img=3"
                        alt="Bot"
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span 
                            className="font-medium mr-2 text-discord-blue"
                          >
                            D0GzBot
                          </span>
                          <span className="text-xs px-1 py-0.5 bg-discord-blue text-white rounded">BOT</span>
                          <span 
                            className="text-xs ml-2"
                            style={{ color: currentStyles['chat-text'] || '#FFFFFF' }}
                          >
                            10:00 AM
                          </span>
                        </div>
                        <p 
                          className="mt-1"
                          style={{ color: currentStyles['chat-text'] || '#FFFFFF' }}
                        >
                          Welcome to the server! Check out our rules and guidelines.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-4 flex items-start">
                      <img
                        src="https://i.pravatar.cc/150?img=6"
                        alt="User"
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span 
                            className="font-medium mr-2"
                            style={{ color: currentStyles['chat-text'] || '#FFFFFF' }}
                          >
                            PixelArtist
                          </span>
                          <span 
                            className="text-xs"
                            style={{ color: currentStyles['chat-text'] || '#FFFFFF' }}
                          >
                            10:05 AM
                          </span>
                        </div>
                        <p 
                          className="mt-1"
                          style={{ color: currentStyles['chat-text'] || '#FFFFFF' }}
                        >
                          Hey everyone, I'm new here!
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-4 flex items-start">
                      <img
                        src="https://i.pravatar.cc/150?img=2"
                        alt="User"
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span 
                            className="font-medium mr-2"
                            style={{ color: currentStyles['chat-text'] || '#FFFFFF' }}
                          >
                            Moderator
                          </span>
                          <span 
                            className="text-xs"
                            style={{ color: currentStyles['chat-text'] || '#FFFFFF' }}
                          >
                            10:06 AM
                          </span>
                        </div>
                        <p 
                          className="mt-1"
                          style={{ color: currentStyles['chat-text'] || '#FFFFFF' }}
                        >
                          Welcome @PixelArtist! Glad to have you here.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chat Input */}
                  <div className="p-4">
                    <div 
                      className="flex items-center rounded-lg overflow-hidden"
                      style={{ backgroundColor: currentStyles['input-bg'] || '#40444B' }}
                    >
                      <button className="p-2 text-gray-400 hover:text-white">
                        <Plus size={20} />
                      </button>
                      <input
                        type="text"
                        placeholder="Message #general"
                        className="w-full bg-transparent px-4 py-2 focus:outline-none"
                        style={{ color: currentStyles['chat-text'] || '#FFFFFF' }}
                      />
                      <button className="p-2 text-gray-400 hover:text-white">
                        <Image size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UIWizard;
 