import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { TGroup, TGroups } from '../types/Group';
import { getGroups } from '../api/messages';
import useAuthContext from './useAuthContext';

function useGroups() {
  const [groups, setGroups] = useState<TGroups>({
    myGroups: [],
    invitedGroups: [],
  });
  const [openGroup, setOpenGroup] = useState<TGroup | null>(null);

  const auth = useAuthContext();

  const { isLoading, isError, error } = useQuery<TGroup[], Error>({
    queryKey: ['groups'],
    queryFn: getGroups,
    refetchOnWindowFocus: false,
    onSuccess(successData) {
      const allGroups = successData.reduce(
        (acc: TGroups, curr) => {
          if (curr.owner === auth.user?._id) {
            acc.myGroups.push(curr);
          } else {
            acc.invitedGroups.push(curr);
          }
          return acc;
        },
        {
          myGroups: [],
          invitedGroups: [],
        }
      );
      setGroups(allGroups);
    },
  });

  return { groups, setOpenGroup, openGroup, isLoading, isError, error };
}

export default useGroups;
