import  { Server, Channel, Member, Role, Message, Command, User } from '../types';

// Mock members
const mockMembers: Member[] = [
  {
    id: 'user1',
    username: 'Admin',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    status: 'online',
    roles: ['role1'],
    joinedAt: '2022-01-01T00:00:00Z',
    isBot: false
  },
  {
    id: 'user2',
    username: 'Moderator',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    status: 'online',
    roles: ['role2'],
    joinedAt: '2022-01-15T00:00:00Z',
    isBot: false
  },
  {
    id: 'user3',
    username: 'D0GzBot',
    avatarUrl: '/bot-avatar.png',
    status: 'online',
    roles: ['role3'],
    joinedAt: '2022-01-01T00:00:00Z',
    isBot: true
  },
  {
    id: 'user4',
    username: 'GamerPro',
    avatarUrl: 'https://i.pravatar.cc/150?img=4',
    status: 'idle',
    roles: ['role4'],
    joinedAt: '2022-02-10T00:00:00Z',
    isBot: false
  },
  {
    id: 'user5',
    username: 'CodeWizard',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    status: 'dnd',
    roles: ['role4'],
    joinedAt: '2022-03-15T00:00:00Z',
    isBot: false
  },
  {
    id: 'user6',
    username: 'PixelArtist',
    avatarUrl: 'https://i.pravatar.cc/150?img=6',
    status: 'offline',
    roles: ['role4'],
    joinedAt: '2022-04-20T00:00:00Z',
    isBot: false
  }
];

// Mock channels
const mockChannels: Channel[] = [
  {
    id: 'category1',
    name: 'INFORMATION',
    type: 'category',
    position: 0
  },
  {
    id: 'channel1',
    name: 'rules',
    type: 'text',
    parentId: 'category1',
    position: 0
  },
  {
    id: 'channel2',
    name: 'welcome',
    type: 'text',
    parentId: 'category1',
    position: 1
  },
  {
    id: 'category2',
    name: 'GENERAL',
    type: 'category',
    position: 1
  },
  {
    id: 'channel3',
    name: 'general',
    type: 'text',
    parentId: 'category2',
    position: 0
  },
  {
    id: 'channel4',
    name: 'stream-announcements',
    type: 'text',
    parentId: 'category2',
    position: 1
  },
  {
    id: 'channel5',
    name: 'bot-commands',
    type: 'text',
    parentId: 'category2',
    position: 2
  },
  {
    id: 'category3',
    name: 'VOICE CHANNELS',
    type: 'category',
    position: 2
  },
  {
    id: 'channel6',
    name: 'General Voice',
    type: 'voice',
    parentId: 'category3',
    position: 0
  },
  {
    id: 'channel7',
    name: 'Gaming Voice',
    type: 'voice',
    parentId: 'category3',
    position: 1
  },
  {
    id: 'channel8',
    name: 'AFK',
    type: 'voice',
    parentId: 'category3',
    position: 2
  }
];

// Mock roles
const mockRoles: Role[] = [
  {
    id: 'role1',
    name: 'Admin',
    color: '#ED4245',
    position: 3,
    permissions: ['ADMINISTRATOR']
  },
  {
    id: 'role2',
    name: 'Moderator',
    color: '#57F287',
    position: 2,
    permissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS']
  },
  {
    id: 'role3',
    name: 'Bot',
    color: '#5865F2',
    position: 1,
    permissions: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
  },
  {
    id: 'role4',
    name: 'Member',
    color: '#7289DA',
    position: 0,
    permissions: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
  }
];

// Mock commands
const mockCommands: Command[] = [
  {
    id: 'cmd1',
    name: 'help',
    description: 'Displays a list of available commands',
    usage: '!help [command]',
    enabled: true,
    permissions: [],
    cooldown: 5
  },
  {
    id: 'cmd2',
    name: 'ping',
    description: 'Checks the bot\'s response time',
    usage: '!ping',
    enabled: true,
    permissions: [],
    cooldown: 3
  },
  {
    id: 'cmd3',
    name: 'ban',
    description: 'Bans a user from the server',
    usage: '!ban @user [reason]',
    enabled: true,
    permissions: ['BAN_MEMBERS'],
    cooldown: 0
  },
  {
    id: 'cmd4',
    name: 'kick',
    description: 'Kicks a user from the server',
    usage: '!kick @user [reason]',
    enabled: true,
    permissions: ['KICK_MEMBERS'],
    cooldown: 0
  },
  {
    id: 'cmd5',
    name: 'mute',
    description: 'Mutes a user for a specified time',
    usage: '!mute @user [duration] [reason]',
    enabled: true,
    permissions: ['MANAGE_ROLES'],
    cooldown: 0
  },
  {
    id: 'cmd6',
    name: 'clear',
    description: 'Clears messages from a channel',
    usage: '!clear [amount]',
    enabled: true,
    permissions: ['MANAGE_MESSAGES'],
    cooldown: 5
  },
  {
    id: 'cmd7',
    name: 'stats',
    description: 'Shows server statistics',
    usage: '!stats',
    enabled: true,
    permissions: [],
    cooldown: 10
  }
];

// Mock servers
export const mockServers: Server[] = [
  {
    id: 'server1',
    name: 'D0GzBot HQ',
    iconUrl: '/server-icons/server1.png',
    memberCount: 1250,
    members: mockMembers,
    channels: mockChannels,
    roles: mockRoles,
    widgets: {
      settings: {
        enabled: true,
        config: {
          prefix: '!',
          loggingEnabled: true,
          logChannelId: 'channel3',
          moderationEnabled: true,
          automodSettings: {
            filterSpam: true,
            filterInvites: true,
            filterLinks: false
          }
        }
      },
      welcome: {
        enabled: true,
        config: {
          message: 'Welcome to the server, {user}! Make sure to check out the rules and say hi in general chat!',
          channelId: 'channel2',
          sendDM: true,
          mentionUser: true,
          enabled: true
        }
      },
      twitch: {
        enabled: true,
        config: {
          notificationsEnabled: true,
          channelId: 'channel4',
          twitchAccounts: [
            {
              id: 'twitch1',
              username: 'GamerX',
              notificationMessage: '{username} is now live: {title}! Watch at {url}'
            },
            {
              id: 'twitch2',
              username: 'CodeStreamer',
              notificationMessage: 'Check out {username} streaming now: {title}'
            }
          ],
          mirrorChat: true
        }
      },
      uiWizard: {
        enabled: true,
        config: {
          theme: 'discord-dark',
          customizableElements: {
            channels: true,
            chat: true,
            memberList: true
          },
          savedStyles: {
            'chat-background': '#2F3136',
            'chat-text': '#FFFFFF',
            'channel-text': '#8E9297',
            'channel-active': '#FFFFFF',
            'sidebar-bg': '#202225'
          }
        }
      },
      commands: {
        enabled: true,
        config: {
          commands: mockCommands
        }
      }
    }
  },
  {
    id: 'server2',
    name: 'Gaming Community',
    iconUrl: '/server-icons/server2.png',
    memberCount: 3421,
    widgets: {
      settings: {
        enabled: true,
        config: {
          prefix: '?',
          loggingEnabled: true,
          logChannelId: 'logs',
          moderationEnabled: true,
          automodSettings: {
            filterSpam: true,
            filterInvites: true,
            filterLinks: true
          }
        }
      },
      welcome: {
        enabled: true,
        config: {
          message: 'Hey {user}, welcome to our Gaming Community! Check out our game-specific channels!',
          channelId: 'welcome',
          sendDM: false,
          mentionUser: true,
          enabled: true
        }
      },
      twitch: {
        enabled: true,
        config: {
          notificationsEnabled: true,
          channelId: 'stream-announcements',
          twitchAccounts: [
            {
              id: 'twitch3',
              username: 'ProGamer123',
              notificationMessage: '{username} is live now with {game}!'
            }
          ],
          mirrorChat: false
        }
      },
      uiWizard: {
        enabled: false,
        config: {
          theme: 'discord-dark',
          customizableElements: {
            channels: true,
            chat: true,
            memberList: true
          },
          savedStyles: {}
        }
      },
      commands: {
        enabled: true,
        config: {
          commands: []
        }
      }
    }
  },
  {
    id: 'server3',
    name: 'Developers Hub',
    iconUrl: '/server-icons/server3.png',
    memberCount: 892,
    widgets: {
      settings: {
        enabled: true,
        config: {
          prefix: '$',
          loggingEnabled: false,
          moderationEnabled: false,
          automodSettings: {
            filterSpam: false,
            filterInvites: false,
            filterLinks: false
          }
        }
      },
      welcome: {
        enabled: false,
        config: {
          message: '',
          channelId: '',
          sendDM: false,
          mentionUser: false,
          enabled: false
        }
      },
      twitch: {
        enabled: false,
        config: {
          notificationsEnabled: false,
          channelId: '',
          twitchAccounts: [],
          mirrorChat: false
        }
      },
      uiWizard: {
        enabled: true,
        config: {
          theme: 'dark-coder',
          customizableElements: {
            channels: true,
            chat: true,
            memberList: true
          },
          savedStyles: {
            'chat-background': '#1E1E1E',
            'chat-text': '#CCCCCC',
            'channel-text': '#8E9297',
            'channel-active': '#FFFFFF',
            'sidebar-bg': '#252526'
          }
        }
      },
      commands: {
        enabled: true,
        config: {
          commands: []
        }
      }
    }
  }
];

// Mock messages for Discord chat
export const mockMessages: Message[] = [
  {
    id: 'msg1',
    content: 'Welcome to the server! Check out our rules and guidelines.',
    author: mockMembers.find(m => m.id === 'user3')!,
    timestamp: '2023-05-14T10:00:00Z'
  },
  {
    id: 'msg2',
    content: 'Hey everyone, I\'m new here!',
    author: mockMembers.find(m => m.id === 'user6')!,
    timestamp: '2023-05-14T10:05:00Z'
  },
  {
    id: 'msg3',
    content: 'Welcome @PixelArtist! Glad to have you here.',
    author: mockMembers.find(m => m.id === 'user2')!,
    timestamp: '2023-05-14T10:06:00Z'
  },
  {
    id: 'msg4',
    content: 'I just set up a new command for the bot. Try !stats to see server information.',
    author: mockMembers.find(m => m.id === 'user1')!,
    timestamp: '2023-05-14T10:10:00Z'
  },
  {
    id: 'msg5',
    content: '!stats',
    author: mockMembers.find(m => m.id === 'user4')!,
    timestamp: '2023-05-14T10:12:00Z'
  },
  {
    id: 'msg6',
    content: 'Server Stats:\nMembers: 1250\nOnline: 42\nChannels: 8\nRoles: 4',
    author: mockMembers.find(m => m.id === 'user3')!,
    timestamp: '2023-05-14T10:12:02Z'
  },
  {
    id: 'msg7',
    content: 'That\'s cool! What other commands are there?',
    author: mockMembers.find(m => m.id === 'user5')!,
    timestamp: '2023-05-14T10:15:00Z'
  },
  {
    id: 'msg8',
    content: 'Try !help to see all available commands.',
    author: mockMembers.find(m => m.id === 'user2')!,
    timestamp: '2023-05-14T10:16:00Z'
  },
  {
    id: 'msg9',
    content: 'I\'m going to stream some coding later today, the bot will announce it!',
    author: mockMembers.find(m => m.id === 'user5')!,
    timestamp: '2023-05-14T10:20:00Z'
  },
  {
    id: 'msg10',
    content: 'Awesome, looking forward to it!',
    author: mockMembers.find(m => m.id === 'user4')!,
    timestamp: '2023-05-14T10:22:00Z'
  }
];

// Mock user data for authentication
export const mockUsers: User[] = [
  {
    id: 'user1',
    username: 'admin',
    email: 'admin@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    role: 'admin'
  },
  {
    id: 'user2',
    username: 'owner',
    email: 'owner@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    role: 'owner'
  },
  {
    id: 'user3',
    username: 'user',
    email: 'user@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    role: 'user'
  }
];

// Mock server stats
export const mockServerStats = {
  totalMembers: 1250,
  onlineMembers: 42,
  messagesLastWeek: 8453,
  commandsLastWeek: 532,
  channelActivity: [
    { id: 'channel3', name: 'general', messages: 4231 },
    { id: 'channel5', name: 'bot-commands', messages: 2187 },
    { id: 'channel4', name: 'stream-announcements', messages: 1253 },
    { id: 'channel2', name: 'welcome', messages: 782 }
  ],
  memberGrowth: 8.5,
  messageGrowth: 12.3,
  commandsGrowth: -3.2
};

// Mock custom styles
export const mockCustomStyles = {
  'chat-background': '#2F3136',
  'chat-text': '#FFFFFF',
  'channel-text': '#8E9297',
  'channel-active': '#FFFFFF',
  'sidebar-bg': '#202225',
  'header-bg': '#36393F',
  'member-list-bg': '#2F3136',
  'input-bg': '#40444B'
};

// Mock available widgets
export const mockWidgets = [
  {
    id: 'settings',
    name: 'Bot Settings',
    description: 'Configure your bot',
    icon: 'Settings',
    category: 'essentials'
  },
  {
    id: 'welcome',
    name: 'Welcome Messages',
    description: 'Customize welcome messages',
    icon: 'MessageCircle',
    category: 'moderation'
  },
  {
    id: 'twitch',
    name: 'Twitch Integration',
    description: 'Connect Twitch streams',
    icon: 'Video',
    category: 'integrations'
  },
  {
    id: 'commands',
    name: 'Custom Commands',
    description: 'Manage bot commands',
    icon: 'Terminal',
    category: 'essentials'
  },
  {
    id: 'uiWizard',
    name: 'UI Wizard',
    description: 'Customize server appearance',
    icon: 'Layout',
    category: 'premium'
  },
  {
    id: 'automod',
    name: 'Auto Moderation',
    description: 'Set up automatic moderation',
    icon: 'Shield',
    category: 'moderation'
  },
  {
    id: 'levels',
    name: 'Level System',
    description: 'Member experience and ranks',
    icon: 'Award',
    category: 'premium'
  },
  {
    id: 'polls',
    name: 'Polls & Voting',
    description: 'Create polls and votes',
    icon: 'BarChart',
    category: 'utilities'
  },
  {
    id: 'music',
    name: 'Music Player',
    description: 'Play music in voice channels',
    icon: 'Music',
    category: 'premium'
  }
];

export { mockChannels, mockMembers, mockRoles, mockCommands };
 