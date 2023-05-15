import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TProfileDefault } from '../../types/Profile';
import { getFriends } from '../../api/profile';
import getOnlineFriends from '../../api/onlineFriends';
import Pfp from '../../assets/pfp-two.svg';

type Props = {
  addChat: (profile: TProfileDefault) => void;
};

function HeaderMessenger({ addChat }: Props) {
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

  return (
    <div className="flex flex-col gap-3 rounded-lg shadow-md bg-white p-3 border">
      <div className="flex justify-between">
        <p className="text-xl font-bold">Chats</p>
        <p>...</p>
      </div>
      <input
        type="text"
        className="px-2 py-1 bg-gray-100 rounded-lg"
        placeholder="Search Messenger"
      />
      <div className="flex flex-col gap-2">
        {friends?.map((f) => {
          const isOnline = onlineFriends?.find((x) => x === f._id);
          return (
            <button
              key={f._id}
              type="button"
              onClick={() => addChat(f)}
              className="flex gap-2 items-center rounded-md border p-2 hover:bg-gray-100"
            >
              <div className="h-8 w-8">
                <Pfp height="100%" width="100%" />
              </div>
              {f.fullName}
              {isOnline ? (
                <div className="h-2 w-2 bg-green-500 rounded-full ml-auto" />
              ) : (
                <div className="h-2 w-2 bg-red-500 rounded-full ml-auto" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default HeaderMessenger;
