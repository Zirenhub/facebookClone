import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client/build/esm/socket';
import { TProfileDefault } from '../types/Profile';
import Back from '../assets/back.svg';
import Pfp from '../assets/pfp-two.svg';
import Send from '../assets/send.svg';

type Props = {
  profile: TProfileDefault;
  close: () => void;
};

let socket: Socket | null = null;

function Chat({ profile, close }: Props) {
  const [message, setMessage] = useState<string>('');

  function handleMessage(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setMessage(target.value);
  }

  function handleSend() {
    if (message && socket) {
      socket.emit('message', message);
      setMessage('');
    }
  }

  useEffect(() => {
    socket = io(`http://localhost:${__PORT__}`, {
      transports: ['websocket', 'polling'],
    });

    return () => {
      socket?.disconnect();
      socket?.off();
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 border-b-2 pb-2 shadow-sm pl-2 py-2">
        <button type="button" onClick={close} className="h-9 w-9">
          <Back height="100%" width="100%" fill="gray" />
        </button>
        <div className="flex items-center gap-2">
          <div className="h-12 w-12">
            <Pfp height="100%" width="100%" />
          </div>
          <p className="font-bold text-xl">{profile.fullName}</p>
        </div>
      </div>
      {/* chat here */}
      <div className="grow" />
      <div className="p-2 flex items-center">
        <input
          type="text"
          autoComplete="off"
          className="bg-gray-200 h-9 p-2 rounded-full w-full"
          onChange={handleMessage}
          value={message}
        />
        <button className="h-8 w-8" type="button" onClick={handleSend}>
          <Send
            height="100%"
            width="100%"
            fill={message ? 'rgb(96 165 250)' : 'rgb(209 213 219)'}
          />
        </button>
      </div>
    </div>
  );
}

export default Chat;
