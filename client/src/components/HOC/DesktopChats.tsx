import React, { useState } from 'react';
import { TProfileDefault } from '../../types/Profile';
import Pfp from '../../assets/pfp-two.svg';
import Close from '../../assets/x.svg';
import Chat from '../Chat/Desktop/Chat';

type Props = {
  activeChats: TProfileDefault[];
  addChat: (profile: TProfileDefault) => void;
  closeChat: (profileID: string) => void;
};

function DesktopChats({ activeChats, addChat, closeChat }: Props) {
  const [minimizedChats, setMinimizedChats] = useState<TProfileDefault[]>([]);
  const [hoveredChatID, setHoveredChatID] = useState<string | null>(null);

  const minimizeChat = (profile: TProfileDefault) => {
    closeChat(profile._id);
    setHoveredChatID(null);
    setMinimizedChats([...minimizedChats, profile]);
  };

  function filterMinimizedChat(c: TProfileDefault) {
    const modifiedChats = minimizedChats.filter((x) => x._id !== c._id);
    setMinimizedChats(modifiedChats);
  }

  function handleAddChat(c: TProfileDefault) {
    filterMinimizedChat(c);
    addChat(c);
  }

  return (
    <div className="absolute bottom-0 right-5 flex gap-3">
      {activeChats.map((c) => {
        return (
          <div key={c._id} className="flex">
            <Chat
              profile={c}
              closeChat={closeChat}
              minimizeChat={minimizeChat}
            />
          </div>
        );
      })}
      {minimizedChats.map((c) => {
        const isHovered = hoveredChatID === c._id;
        return (
          <button
            type="button"
            key={c._id}
            onMouseEnter={() => setHoveredChatID(c._id)}
            onMouseLeave={() => setHoveredChatID(null)}
            onClick={() => handleAddChat(c)}
            className="bg-white relative h-fit self-end mb-4 p-1 rounded-full flex flex-col justify-center items-center"
          >
            <div className="h-12 w-12">
              <Pfp height="100%" width="100%" />
            </div>
            {isHovered && (
              <>
                <button
                  type="button"
                  onClick={(e: React.SyntheticEvent) => {
                    e.stopPropagation();
                    filterMinimizedChat(c);
                  }}
                  className="absolute bg-white rounded-full p-1 -top-1 -right-1"
                >
                  <div className="h-4 w-4">
                    <Close height="100%" width="100%" />
                  </div>
                </button>
                <p className="absolute bg-white rounded-lg p-2 -left-24">
                  {c.fullName}
                </p>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default DesktopChats;
