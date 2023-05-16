import React, { useState } from 'react';
import { TProfileDefault } from '../../types/Profile';
import Pfp from '../../assets/pfp-two.svg';
import Close from '../../assets/x.svg';
import Chat from '../Chat/Desktop/Chat';

type Props = {
  activeChats: TProfileDefault[];
  minimizedChats: TProfileDefault[];
  addChat: (profile: TProfileDefault) => void;
  closeChat: (profileID: string, state: 'active' | 'minimized') => void;
  minimizeChat: (profileID: string) => void;
};

function DesktopChats({
  activeChats,
  minimizedChats,
  addChat,
  closeChat,
  minimizeChat,
}: Props) {
  const [hoveredChatID, setHoveredChatID] = useState<string | null>(null);

  return (
    <div className="fixed bottom-0 right-5 flex gap-3 z-30">
      {activeChats.map((c) => {
        return (
          <div key={c._id} className="flex">
            <Chat
              profile={c}
              closeChat={(profileID: string) => closeChat(profileID, 'active')}
              minimizeChat={minimizeChat}
            />
          </div>
        );
      })}
      {minimizedChats.length > 0 && (
        <div className="flex flex-col h-fit self-end mb-2 gap-3">
          {minimizedChats.map((c) => {
            const isHovered = hoveredChatID === c._id;
            return (
              <button
                type="button"
                key={c._id}
                onMouseEnter={() => setHoveredChatID(c._id)}
                onMouseLeave={() => setHoveredChatID(null)}
                onClick={() => addChat(c)}
                className="relative"
              >
                {isHovered && (
                  <button
                    type="button"
                    onClick={(e: React.SyntheticEvent) => {
                      e.stopPropagation();
                      closeChat(c._id, 'minimized');
                    }}
                    className="absolute bg-white rounded-full p-1 -top-1 -right-1"
                  >
                    <div className="h-4 w-4">
                      <Close height="100%" width="100%" />
                    </div>
                  </button>
                )}
                <div className="h-14 w-14 bg-white p-1 rounded-full">
                  <Pfp height="100%" width="100%" />
                  {isHovered && (
                    <p className="bg-white -left-[65%] top-2/4 -translate-y-2/4 -translate-x-[65%] border absolute rounded-lg p-2 z-30">
                      {c.fullName}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DesktopChats;
