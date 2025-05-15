import  { useState } from 'react';
import { ShoppingBag, Star, Settings, MessageCircle, Video, Layout, Terminal, Shield, Award, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import NavigationMenu from '../components/NavigationMenu';
import { useServerContext } from '../contexts/ServerContext';
import { mockWidgets } from '../data/mockData';

const WidgetStore = () => {
  const { currentServer, updateServerWidget } = useServerContext();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetails, setShowDetails] = useState<string | null>(null);
  
  const categories = [
    { id: 'all', name: 'All Widgets' },
    { id: 'essentials', name: 'Essentials' },
    { id: 'moderation', name: 'Moderation' },
    { id: 'integrations', name: 'Integrations' },
    { id: 'utilities', name: 'Utilities' },
    { id: 'premium', name: 'Premium' }
  ];
  
  const filteredWidgets = mockWidgets.filter(widget => {
    const matchesCategory = selectedCategory === 'all' || widget.category === selectedCategory;
    const matchesSearch = widget.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          widget.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Settings': return <Settings size={24} />;
      case 'MessageCircle': return <MessageCircle size={24} />;
      case 'Video': return <Video size={24} />;
      case 'Terminal': return <Terminal size={24} />;
      case 'Layout': return <Layout size={24} />;
      case 'Shield': return <Shield size={24} />;
      case 'Award': return <Award size={24} />;
      default: return <Settings size={24} />;
    }
  };
  
  const isWidgetEnabled = (widgetId: string) => {
    return currentServer.widgets[widgetId] && currentServer.widgets[widgetId].enabled;
  };
  
  const toggleWidget = (widgetId: string) => {
    const isCurrentlyEnabled = isWidgetEnabled(widgetId);
    
    // If the widget is already in the server's config, toggle its enabled state
    if (currentServer.widgets[widgetId]) {
      updateServerWidget(currentServer.id, widgetId, {
        ...currentServer.widgets[widgetId].config,
        enabled: !isCurrentlyEnabled
      });
    } else {
      // Otherwise, initialize it with default config
      updateServerWidget(currentServer.id, widgetId, {
        enabled: true,
        config: {}
      });
    }
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
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold flex items-center">
                  <ShoppingBag className="mr-2" />
                  Widget Store
                </h1>
                
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search widgets..."
                    className="input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mb-6 flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-discord-blue text-white'
                        : 'bg-discord-darker text-gray-300 hover:bg-discord-blue/20 hover:text-white'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              {filteredWidgets.length === 0 ? (
                <div className="bg-discord-darker rounded-lg p-8 text-center">
                  <ShoppingBag size={48} className="mx-auto text-gray-500 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No widgets found</h2>
                  <p className="text-gray-400">
                    {searchTerm 
                      ? `No widgets matching "${searchTerm}"` 
                      : `No widgets in the ${categories.find(c => c.id === selectedCategory)?.name} category`}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredWidgets.map(widget => (
                    <div 
                      key={widget.id}
                      className="bg-discord-darker border border-gray-700 rounded-lg overflow-hidden hover:border-discord-blue transition-colors cursor-pointer"
                      onClick={() => setShowDetails(widget.id)}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                              widget.category === 'premium' 
                                ? 'bg-gradient-to-r from-discord-purple to-discord-blue' 
                                : 'bg-discord-blue bg-opacity-10'
                            }`}>
                              {getIconComponent(widget.icon)}
                            </div>
                            <div>
                              <h3 className="font-semibold">{widget.name}</h3>
                              {widget.category === 'premium' && (
                                <span className="premium-badge text-xs">Premium</span>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            {isWidgetEnabled(widget.id) && (
                              <div className="flex items-center text-discord-green">
                                <CheckCircle size={16} className="mr-1" />
                                <span className="text-xs">Enabled</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-400 mb-4">{widget.description}</p>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map(n => (
                              <Star 
                                key={n}
                                size={14} 
                                className={n <= 4 ? 'text-discord-yellow' : 'text-gray-600'} 
                                fill={n <= 4 ? 'currentColor' : 'none'} 
                              />
                            ))}
                          </div>
                          <button 
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              isWidgetEnabled(widget.id)
                                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                                : 'bg-discord-blue hover:bg-opacity-80 text-white'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWidget(widget.id);
                            }}
                          >
                            {isWidgetEnabled(widget.id) ? 'Disable' : 'Enable'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      
      {/* Widget Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-discord-darker rounded-lg w-full max-w-2xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                    mockWidgets.find(w => w.id === showDetails)?.category === 'premium' 
                      ? 'bg-gradient-to-r from-discord-purple to-discord-blue' 
                      : 'bg-discord-blue bg-opacity-10'
                  }`}>
                    {getIconComponent(mockWidgets.find(w => w.id === showDetails)?.icon || '')}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {mockWidgets.find(w => w.id === showDetails)?.name}
                    </h2>
                    {mockWidgets.find(w => w.id === showDetails)?.category === 'premium' && (
                      <span className="premium-badge">Premium</span>
                    )}
                  </div>
                </div>
                
                <button 
                  className="text-gray-400 hover:text-white"
                  onClick={() => setShowDetails(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-2">
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-gray-300">
                    {mockWidgets.find(w => w.id === showDetails)?.description}
                  </p>
                  
                  <h3 className="font-medium mt-6 mb-2">Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-discord-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>Integrates directly with your server</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-discord-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>Easy to set up and customize</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-discord-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>Regularly updated with new features</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-discord-darkest rounded-lg p-4">
                  <h3 className="font-medium mb-4">Widget Information</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-400">Category</div>
                      <div className="capitalize">{mockWidgets.find(w => w.id === showDetails)?.category}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-400">Rating</div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(n => (
                          <Star 
                            key={n}
                            size={16} 
                            className={n <= 4 ? 'text-discord-yellow' : 'text-gray-600'} 
                            fill={n <= 4 ? 'currentColor' : 'none'} 
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-400">Status</div>
                      <div className={isWidgetEnabled(showDetails) ? 'text-discord-green' : 'text-gray-400'}>
                        {isWidgetEnabled(showDetails) ? 'Enabled' : 'Disabled'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button 
                      className={`w-full py-2 rounded-md font-medium ${
                        isWidgetEnabled(showDetails)
                          ? 'bg-gray-700 hover:bg-gray-600 text-white'
                          : 'bg-discord-blue hover:bg-opacity-80 text-white'
                      }`}
                      onClick={() => toggleWidget(showDetails)}
                    >
                      {isWidgetEnabled(showDetails) ? 'Disable Widget' : 'Enable Widget'}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-6 flex justify-end">
                <button 
                  className="btn btn-outline"
                  onClick={() => setShowDetails(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WidgetStore;
 