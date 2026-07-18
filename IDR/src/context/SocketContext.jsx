import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Read API base URL (falling back to localhost if undefined)
    let baseUrlRaw = import.meta.env.VITE_API_BASE;
    if (!baseUrlRaw) {
      baseUrlRaw = window.location.hostname === 'localhost'
        ? 'http://localhost:4000'
        : 'https://idr-backend-49rq.onrender.com';
    }
    const baseUrl = baseUrlRaw.replace(/^"(.*)"$/, '$1').replace(/\/$/, '');

    console.log('Connecting to Socket.io server at:', baseUrl);

    // Initialize connection
    const newSocket = io(baseUrl, {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Websocket connected successfully:', newSocket.id);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Websocket connection error:', error.message);
    });

    // Cleanup on unmount
    return () => {
      console.log('Disconnecting websocket...');
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  return context; // Returns socket instance or null
};

export default SocketContext;
