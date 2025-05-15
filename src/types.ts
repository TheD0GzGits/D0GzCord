export  interface Server {
  id: string;
  name: string;
  iconUrl: string;
  memberCount: number;
  members?: Member[];
  channels?: Channel[];
  roles?: Role[];
  widgets: {
    [key: string]: {
      enabled: boolean;
      config: any;
    };
  };
}

export interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice' | 'category';
  parentId?: string;
  position: number;
}

export interface Member {
  id: string;
  username: string;
  avatarUrl: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  roles: string[];
  joinedAt: string;
  isBot: boolean;
}

export interface Role {
  id: string;
  name: string;
  color: string;
  position: number;
  permissions: string[];
}

export interface Command {
  id: string;
  name: string;
  description: string;
  usage: string;
  enabled: boolean;
  permissions: string[];
  cooldown: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  role: 'user' | 'admin' | 'owner';
}

export interface Message {
  id: string;
  content: string;
  author: Member;
  timestamp: string;
}

export interface ServerContext {
  servers: Server[];
  currentServer: Server;
  setCurrentServer: (server: Server) => void;
  updateServerWidget: (serverId: string, widgetId: string, config: any) => void;
}

export interface AuthContext {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
}
 