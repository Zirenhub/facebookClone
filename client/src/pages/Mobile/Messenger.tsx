import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getFriends } from '../../api/profile';
import Close from '../../assets/x.svg';
import Loading from '../../components/Loading';
import { TProfileDefault } from '../../types/Profile';
import Pfp from '../../assets/pfp-two.svg';
import Chat from '../../components/Chat/Chat';

function Messenger({ close }: { close: () => void }) {
  const [currentChat, setCurrentChat] = useState<TProfileDefault | null>(null);

  const { isLoading, isError, data, error } = useQuery<
    TProfileDefault[],
    Error
  >({
    queryKey: ['friends'],
    queryFn: () => getFriends(),
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
      <div className="mt-5">
        {data?.map((friend) => {
          return (
            <div
              key={friend._id}
              className="flex font-bold gap-3 border-b-2 pb-2"
              role="button"
              tabIndex={0}
              onClick={() => setCurrentChat(friend)}
              onKeyDown={() => setCurrentChat(friend)}
            >
              <div className="h-12 w-12 relative">
                <Pfp height="100%" width="100%" />
                <div className="absolute h-3 w-3 border-2 border-white bg-green-400 bottom-1 right-1 rounded-full" />
              </div>
              <p className="text-xl">{friend.fullName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Messenger;
