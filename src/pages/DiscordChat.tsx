import  { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Plus, Smile, Image } from 'lucide-react';
import { useServerContext } from '../contexts/ServerContext';
import { mockMessages } from '../data/mockData';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const DiscordChat = () => {
  const { currentServer } = useServerContext();
  const [messages, setMessages] = useState(mockMessages);
  const [inputValue, setInputValue] = useState('');
  const [currentChannel, setCurrentChannel] = useState({ id: 'channel3', name: 'general' });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getCustomStyles = () => {
    const styles = currentServer.widgets.uiWizard?.config?.savedStyles || {};
    return {
      chatBackground: styles['chat-background'] || '#36393F',
      chatText: styles['chat-text'] || '#FFFFFF',
      channelText: styles['channel-text'] || '#8E9297',
      channelActive: styles['channel-active'] || '#FFFFFF',
      sidebarBg: styles['sidebar-bg'] || '#2F3136',
      headerBg: styles['header-bg'] || '#36393F',
      memberListBg: styles['member-list-bg'] || '#2F3136',
      inputBg: styles['input-bg'] || '#40444B'
    };
  };

  const styles = getCustomStyles();

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: `msg${Date.now()}`,
      content: inputValue,
      author: {
        id: 'user1',
        username: 'Admin',
        avatarUrl: 'https://i.pravatar.cc/150?img=1',
        status: 'online',
        roles: ['role1'],
        joinedAt: '2022-01-01T00:00:00Z',
        isBot: false
      },
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: styles.chatBackground }}>
        <Header />
        
        <div className="flex-1 flex overflow-hidden">
          {/* Channels Sidebar */}
          <div 
            className="w-60 overflow-y-auto"
            style={{ backgroundColor: styles.sidebarBg }}
          >
            <div className="p-3">
              <div className="category-name">INFORMATION</div>
              <div className={`channel-item ${currentChannel.id === 'channel1' ? 'active' : ''}`}
                onClick={() => setCurrentChannel({ id: 'channel1', name: 'rules' })}
                style={{ color: currentChannel.id === 'channel1' ? styles.channelActive : styles.channelText }}
              >
                <span className="channel-icon">#</span> rules
              </div>
              <div className={`channel-item ${currentChannel.id === 'channel2' ? 'active' : ''}`}
                onClick={() => setCurrentChannel({ id: 'channel2', name: 'welcome' })}
                style={{ color: currentChannel.id === 'channel2' ? styles.channelActive : styles.channelText }}
              >
                <span className="channel-icon">#</span> welcome
              </div>
              
              <div className="category-name">GENERAL</div>
              <div className={`channel-item ${currentChannel.id === 'channel3' ? 'active' : ''}`}
                onClick={() => setCurrentChannel({ id: 'channel3', name: 'general' })}
                style={{ color: currentChannel.id === 'channel3' ? styles.channelActive : styles.channelText }}
              >
                <span className="channel-icon">#</span> general
              </div>
              <div className={`channel-item ${currentChannel.id === 'channel4' ? 'active' : ''}`}
                onClick={() => setCurrentChannel({ id: 'channel4', name: 'stream-announcements' })}
                style={{ color: currentChannel.id === 'channel4' ? styles.channelActive : styles.channelText }}
              >
                <span className="channel-icon">#</span> stream-announcements
              </div>
              <div className={`channel-item ${currentChannel.id === 'channel5' ? 'active' : ''}`}
                onClick={() => setCurrentChannel({ id: 'channel5', name: 'bot-commands' })}
                style={{ color: currentChannel.id === 'channel5' ? styles.channelActive : styles.channelText }}
              >
                <span className="channel-icon">#</span> bot-commands
              </div>
              
              <div className="category-name">VOICE CHANNELS</div>
              <div className="channel-item" style={{ color: styles.channelText }}>
                <span className="channel-icon">🔊</span> General Voice
              </div>
              <div className="channel-item" style={{ color: styles.channelText }}>
                <span className="channel-icon">🔊</span> Gaming Voice
              </div>
              <div className="channel-item" style={{ color: styles.channelText }}>
                <span className="channel-icon">🔊</span> AFK
              </div>
            </div>
          </div>
          
          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col" style={{ backgroundColor: styles.chatBackground }}>
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map(message => (
                <div key={message.id} className="mb-4 flex items-start">
                  <img
                    src={message.author.avatarUrl}
                    alt={message.author.username}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-medium mr-2" style={{ color: message.author.isBot ? '#5865F2' : styles.chatText }}>
                        {message.author.username}
                      </span>
                      {message.author.isBot && (
                        <span className="text-xs px-1 py-0.5 bg-discord-blue text-white rounded">BOT</span>
                      )}
                      <span className="text-xs text-gray-400 ml-2">
                        {formatTimestamp(message.timestamp)}
                      </span>
                    </div>
                    <p className="mt-1" style={{ color: styles.chatText }}>
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4">
              <div className="flex items-center rounded-lg overflow-hidden" style={{ backgroundColor: styles.inputBg }}>
                <button className="p-2 text-gray-400 hover:text-white">
                  <Plus size={20} />
                </button>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={`Message #${currentChannel?.name || 'general'}`}
                  className="w-full bg-transparent text-white px-4 py-2 focus:outline-none"
                  style={{ color: styles.chatText }}
                />
                <button className="p-2 text-gray-400 hover:text-white">
                  <Image size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-white">
                  <Smile size={20} />
                </button>
                <button 
                  className="p-2 text-gray-400 hover:text-white"
                  onClick={handleSendMessage}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Members Sidebar */}
          <div 
            className="w-60 overflow-y-auto"
            style={{ backgroundColor: styles.memberListBg }}
          >
            <div className="p-3">
              <div className="category-name mb-2">ONLINE — 3</div>
              {currentServer.members?.filter(m => m.status === 'online').map(member => (
                <div key={member.id} className="flex items-center p-2 hover:bg-discord-dark rounded">
                  <div className="relative mr-3">
                    <img
                      src={member.avatarUrl}
                      alt={member.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="status-dot status-online"></span>
                  </div>
                  <div>
                    <div className={`text-sm ${member.isBot ? 'text-discord-blue' : 'text-white'}`}>
                      {member.username}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="category-name mb-2 mt-4">IDLE — 1</div>
              {currentServer.members?.filter(m => m.status === 'idle').map(member => (
                <div key={member.id} className="flex items-center p-2 hover:bg-discord-dark rounded">
                  <div className="relative mr-3">
                    <img
                      src={member.avatarUrl}
                      alt={member.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="status-dot status-idle"></span>
                  </div>
                  <div>
                    <div className="text-sm text-white">{member.username}</div>
                  </div>
                </div>
              ))}
              
              <div className="category-name mb-2 mt-4">DO NOT DISTURB — 1</div>
              {currentServer.members?.filter(m => m.status === 'dnd').map(member => (
                <div key={member.id} className="flex items-center p-2 hover:bg-discord-dark rounded">
                  <div className="relative mr-3">
                    <img
                      src={member.avatarUrl}
                      alt={member.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="status-dot status-dnd"></span>
                  </div>
                  <div>
                    <div className="text-sm text-white">{member.username}</div>
                  </div>
                </div>
              ))}
              
              <div className="category-name mb-2 mt-4">OFFLINE — 1</div>
              {currentServer.members?.filter(m => m.status === 'offline').map(member => (
                <div key={member.id} className="flex items-center p-2 hover:bg-discord-dark rounded">
                  <div className="relative mr-3">
                    <img
                      src={member.avatarUrl}
                      alt={member.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="status-dot status-offline"></span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">{member.username}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscordChat;
 