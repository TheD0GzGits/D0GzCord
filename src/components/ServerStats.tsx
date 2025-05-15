import  { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Users, MessageCircle, Terminal, Activity, HelpCircle } from 'lucide-react';
import { mockServerStats } from '../data/mockData';

interface ServerStatsProps {
  serverId: string;
}

const ServerStats = ({ serverId }: ServerStatsProps) => {
  const [stats] = useState(mockServerStats);
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month'>('week');
  const [refreshing, setRefreshing] = useState(false);
  
  const refreshStats = () => {
    setRefreshing(true);
    
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  
  useEffect(() => {
    refreshStats();
  }, [serverId, timeframe]);

  return (
    <div className="card">
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <h2 className="text-xl font-semibold">Server Stats</h2>
        <div className="flex items-center space-x-2">
          <div className="flex border border-gray-700 rounded-md overflow-hidden">
            <button 
              className={`px-3 py-1 text-sm ${timeframe === 'day' ? 'bg-discord-blue text-white' : 'hover:bg-discord-dark'}`}
              onClick={() => setTimeframe('day')}
            >
              Day
            </button>
            <button 
              className={`px-3 py-1 text-sm ${timeframe === 'week' ? 'bg-discord-blue text-white' : 'hover:bg-discord-dark'}`}
              onClick={() => setTimeframe('week')}
            >
              Week
            </button>
            <button 
              className={`px-3 py-1 text-sm ${timeframe === 'month' ? 'bg-discord-blue text-white' : 'hover:bg-discord-dark'}`}
              onClick={() => setTimeframe('month')}
            >
              Month
            </button>
          </div>
          
          <button 
            className={`p-2 rounded-md hover:bg-discord-dark transition-colors ${refreshing ? 'animate-spin' : ''}`}
            onClick={refreshStats}
            disabled={refreshing}
          >
            <RefreshIcon size={16} />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Members"
            value={stats.totalMembers}
            change={stats.memberGrowth}
            icon={<Users size={20} />}
            color="blue"
          />
          
          <StatCard 
            title="Online Members"
            value={stats.onlineMembers}
            change={0}
            icon={<Activity size={20} />}
            color="green"
          />
          
          <StatCard 
            title="Messages"
            value={stats.messagesLastWeek}
            change={stats.messageGrowth}
            icon={<MessageCircle size={20} />}
            color="purple"
          />
          
          <StatCard 
            title="Commands Used"
            value={stats.commandsLastWeek}
            change={stats.commandsGrowth}
            icon={<Terminal size={20} />}
            color="yellow"
          />
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Channel Activity</h3>
          <div className="space-y-3">
            {stats.channelActivity.map(channel => (
              <div key={channel.id} className="bg-discord-darkest rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-1">#</span>
                    <span>{channel.name}</span>
                  </div>
                  <span>{channel.messages} messages</span>
                </div>
                
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${(channel.messages / stats.channelActivity[0].messages) * 100}%`,
                      backgroundColor: 
                        channel.name === 'general' ? '#5865F2' : 
                        channel.name === 'bot-commands' ? '#57F287' : 
                        channel.name === 'stream-announcements' ? '#9B59B6' : 
                        '#FEE75C'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-discord-darkest rounded-lg p-4">
            <h3 className="text-lg font-medium mb-3">Member Growth</h3>
            <div className="h-48 flex items-center justify-center text-gray-500">
              <div className="flex items-center">
                <HelpCircle size={18} className="mr-2" />
                <span>Growth chart would be shown here</span>
              </div>
            </div>
          </div>
          
          <div className="bg-discord-darkest rounded-lg p-4">
            <h3 className="text-lg font-medium mb-3">Message Activity</h3>
            <div className="h-48 flex items-center justify-center text-gray-500">
              <div className="flex items-center">
                <HelpCircle size={18} className="mr-2" />
                <span>Activity chart would be shown here</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  icon: JSX.Element;
  color: 'blue' | 'green' | 'purple' | 'yellow';
}

const StatCard = ({ title, value, change, icon, color }: StatCardProps) => {
  const colorClasses = {
    blue: 'bg-discord-blue bg-opacity-10 text-discord-blue',
    green: 'bg-discord-green bg-opacity-10 text-discord-green',
    purple: 'bg-discord-purple bg-opacity-10 text-discord-purple',
    yellow: 'bg-discord-yellow bg-opacity-10 text-discord-yellow'
  };
  
  return (
    <div className="bg-discord-darkest rounded-lg p-4">
      <div className="flex items-center mb-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${colorClasses[color]}`}>
          {icon}
        </div>
        <div className="text-gray-400 text-sm">{title}</div>
      </div>
      
      <div className="flex items-end justify-between">
        <div className="text-3xl font-semibold">
          {value.toLocaleString()}
        </div>
        
        {change !== 0 && (
          <div className={`flex items-center ${change > 0 ? 'text-discord-green' : 'text-discord-red'}`}>
            {change > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="ml-1">{Math.abs(change)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

const RefreshIcon = ({ size }: { size: number }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
    </svg>
  );
};

export default ServerStats;
 