import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';

export const useSocket = (userEmail: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(SERVER_URL, {
      transports: ['websocket'],
    });

    socketIo.on('connect', () => {
      console.log('Conectado ao servidor!');
      socketIo.emit('registerEmail', userEmail);
    });

    socketIo.on('disconnect', () => {
      console.log('Desconectado do servidor!');
    });

    setSocket(socketIo);

    // Cleanup function
    return () => {
      socketIo.disconnect();
    };

  }, [userEmail]);

  return socket;
};
