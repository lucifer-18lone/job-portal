import React, { createContext, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from './AuthContext';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');

  useEffect(() => {
    if (user) {
      socket.emit('join_room', user.id);
      
      socket.on('status_change', (data) => {
        alert(`Your application status has been updated to: ${data.status.toUpperCase()}`);
      });
    }

    return () => socket.disconnect();
  }, [user, socket]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
