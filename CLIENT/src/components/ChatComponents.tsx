// components/ChatComponent.tsx
import { useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';

const ChatComponent = () => {
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('Conectado ao servidor!');
      });

      socket.on('hello', (msg: string) => {
        console.log(msg);
      });

    }
  }, [socket]);

  return (
    <div>
      <h1>Chat Component</h1>
    </div>
  );
};

export default ChatComponent;
