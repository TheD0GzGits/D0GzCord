import  { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { Server } from './types';

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const serversCollection = collection(db, 'servers');

// Mock data for development
const mockServers: Server[] = [
  {
    id: "938475610293",
    name: "Gaming Community",
    ownerId: "user123",
    botStatus: "online",
    widgets: {
      settings: {
        active: true,
        config: { prefix: "!", deleteCommands: true }
      },
      welcome: {
        active: true,
        config: { message: "Welcome to our Gaming server, {user}!", channel: "welcome", sendDM: true }
      },
      commands: {
        active: true,
        config: { 
          commands: [
            { name: "ping", response: "Pong!", enabled: true },
            { name: "help", response: "Available commands: !ping, !server, !help", enabled: true },
            { name: "server", response: "Server info: {server}", enabled: true }
          ]
        }
      }
    },
    createdAt: "2023-06-01T12:00:00Z",
    hostPlan: "premium",
    iconUrl: ""
  },
  {
    id: "123456789012",
    name: "Developer Hub",
    ownerId: "user456",
    botStatus: "online",
    widgets: {
      settings: {
        active: true,
        config: { prefix: "?", deleteCommands: false }
      },
      welcome: {
        active: true,
        config: { message: "Welcome to the Developer Hub, {user}! Check out our rules in #rules", channel: "general", sendDM: false }
      },
      commands: {
        active: true,
        config: { 
          commands: [
            { name: "ping", response: "Pong!", enabled: true },
            { name: "github", response: "Our GitHub: https://github.com/devhub", enabled: true }
          ]
        }
      }
    },
    createdAt: "2023-05-15T14:30:00Z",
    hostPlan: "standard",
    iconUrl: ""
  }
];

// Get server by ID
export const getServer = async (serverId: string): Promise<Server | null> => {
  try {
    // For development, return mock data
    const mockServer = mockServers.find(s => s.id === serverId);
    if (mockServer) return mockServer;
    
    // For production, use Firestore
    const serverDoc = await getDoc(doc(serversCollection, serverId));
    if (serverDoc.exists()) {
      return serverDoc.data() as Server;
    }
    return null;
  } catch (error) {
    console.error("Error fetching server:", error);
    return null;
  }
};

// Update server widget config
export const updateServerWidgetConfig = async (
  serverId: string, 
  widgetId: string, 
  active: boolean, 
  config?: Record<string, any>
) => {
  try {
    // For development with mock data
    const serverIndex = mockServers.findIndex(s => s.id === serverId);
    if (serverIndex !== -1) {
      mockServers[serverIndex].widgets[widgetId] = {
        active,
        config: config || mockServers[serverIndex].widgets[widgetId]?.config || {}
      };
      return;
    }
    
    // For production with Firestore
    const serverRef = doc(serversCollection, serverId);
    
    if (config) {
      await updateDoc(serverRef, {
        [`widgets.${widgetId}.active`]: active,
        [`widgets.${widgetId}.config`]: config
      });
    } else {
      await updateDoc(serverRef, {
        [`widgets.${widgetId}.active`]: active
      });
    }
  } catch (error) {
    console.error("Error updating server widget:", error);
  }
};

// Listen for server updates
export const onServersUpdate = (callback: (servers: Server[]) => void) => {
  // For development, immediately return mock servers
  callback(mockServers);
  
  // Return a mock unsubscribe function
  return () => {};
  
  // For production with Firestore, uncomment this:
  /*
  return onSnapshot(serversCollection, (snapshot) => {
    const servers: Server[] = [];
    snapshot.forEach(doc => {
      servers.push(doc.data() as Server);
    });
    callback(servers);
  });
  */
};

export { db };
 