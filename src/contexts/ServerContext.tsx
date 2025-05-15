import  { createContext, useState, useContext, ReactNode } from 'react';
import { Server, ServerContext as IServerContext } from '../types';
import { mockServers } from '../data/mockData';

const ServerContext = createContext<IServerContext>({
  servers: [],
  currentServer: {} as Server,
  setCurrentServer: () => {},
  updateServerWidget: () => {}
});

export const useServerContext = () => useContext(ServerContext);

interface ServerProviderProps {
  children: ReactNode;
}

export const ServerProvider = ({ children }: ServerProviderProps) => {
  const [servers, setServers] = useState<Server[]>(mockServers);
  const [currentServer, setCurrentServer] = useState<Server>(mockServers[0]);

  const updateServerWidget = (serverId: string, widgetId: string, config: any) => {
    const updatedServers = servers.map(server => {
      if (server.id === serverId) {
        return {
          ...server,
          widgets: {
            ...server.widgets,
            [widgetId]: {
              ...server.widgets[widgetId],
              config
            }
          }
        };
      }
      return server;
    });

    setServers(updatedServers);
    
    // Update currentServer if it's the one being modified
    if (currentServer.id === serverId) {
      const updatedServer = updatedServers.find(s => s.id === serverId);
      if (updatedServer) {
        setCurrentServer(updatedServer);
      }
    }
  };

  return (
    <ServerContext.Provider value={{ servers, currentServer, setCurrentServer, updateServerWidget }}>
      {children}
    </ServerContext.Provider>
  );
};
 