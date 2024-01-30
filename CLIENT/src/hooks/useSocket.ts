import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:10000';

export const useSocket = (userEmail: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(SERVER_URL);
  
    socketIo.on('connect', () => {
      console.log('Conectado ao servidor!');
      socketIo.emit('registerEmail', userEmail);
    });
  
    setSocket(socketIo);
  
    function cleanup() {
      socketIo.disconnect();
    }
  
    return cleanup;
  
  }, [userEmail]);
  

  return socket;
};
