import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getFriends } from '../../api/profile';
import Close from '../../assets/x.svg';
import Loading from '../../components/Loading';
import { TProfileDefault } from '../../types/Profile';
import Pfp from '../../assets/pfp-two.svg';
import Chat from '../../components/Chat/Mobile/Chat';
import getOnlineFriends from '../../api/onlineFriends';

function Messenger({ close }: { close: () => void }) {
  const [currentChat, setCurrentChat] = useState<TProfileDefault | null>(null);
  const [friends, setFriends] = useState<TProfileDefault[] | null>(null);
  const [onlineFriends, setOnlineFriends] = useState<string[] | null>(null);

  const { isLoading, isError, error } = useQuery<
    [TProfileDefault[], string[]],
    Error
  >({
    queryKey: ['friends'],
    queryFn: () => Promise.all([getFriends(), getOnlineFriends()]),
    onSuccess([f, online]) {
      setFriends(f);
      setOnlineFriends(online);
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    <Loading />;
  }

  if (isError) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }

  if (currentChat) {
    return <Chat profile={currentChat} close={() => setCurrentChat(null)} />;
  }

  return (
    <div className="p-3">
      <button type="button" onClick={close} className="h-6 w-6">
        <Close height="100%" width="100%" />
      </button>
      <div className="flex flex-col">
        {friends?.map((friend) => {
          const isOnline = onlineFriends?.includes(friend._id);

          return (
            <button
              key={friend._id}
              type="button"
              className="flex font-bold gap-3 border-b-2 pb-2 grow my-2"
              onClick={() => setCurrentChat(friend)}
            >
              <div className="h-12 w-12 relative">
                <Pfp height="100%" width="100%" />
                {isOnline && (
                  <div className="absolute h-3 w-3 border-2 border-white bg-green-400 bottom-1 right-1 rounded-full" />
                )}
              </div>
              <p className="text-xl">{friend.fullName}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Messenger;
