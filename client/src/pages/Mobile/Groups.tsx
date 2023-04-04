import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getGroups } from '../../api/messages';
import CreateGroupModal from '../../components/Groups/CreateGroupModal';
import GroupOverview from '../../components/Groups/GroupOverview';
import Loading from '../../components/Loading';
import useAuthContext from '../../hooks/useAuthContext';
import { TGroup } from '../../types/Group';
import GroupChat from './GroupChat';

type TGroups = {
  myGroups: TGroup[];
  invitedGroups: TGroup[];
};

function Groups() {
  const [openGroup, setOpenGroup] = useState<TGroup | null>(null);
  const [createGroupModal, setCreateGroupModal] = useState<boolean>(false);
  const [groups, setGroups] = useState<TGroups>({
    myGroups: [],
    invitedGroups: [],
  });
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

  if (openGroup) {
    return <GroupChat group={openGroup} close={() => setOpenGroup(null)} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="m-2">
      <button
        type="button"
        onClick={() => setCreateGroupModal(!createGroupModal)}
        className={`${
          createGroupModal ? 'bg-red-500' : 'bg-green-500'
        } text-white px-3 py-2 rounded-full`}
      >
        {createGroupModal ? 'Close' : 'Create Group'}
      </button>
      {createGroupModal ? (
        <CreateGroupModal close={() => setCreateGroupModal(false)} />
      ) : (
        <div className="flex flex-col my-2">
          <p className="font-bold text-3xl">YOUR GROUPS</p>
          {groups.myGroups.length > 0 ? (
            groups.myGroups.map((g) => {
              return (
                <div key={g._id}>
                  <GroupOverview group={g} openGroup={() => setOpenGroup(g)} />
                </div>
              );
            })
          ) : (
            <p className="text-center">You don&apos;t have any groups...</p>
          )}
          <p className="font-bold text-3xl">INVITED GROUPS</p>
          {groups.invitedGroups.length > 0 ? (
            groups.invitedGroups.map((g) => {
              return (
                <div key={g._id}>
                  <GroupOverview group={g} openGroup={() => setOpenGroup(g)} />
                </div>
              );
            })
          ) : (
            <p className="text-center">You are not invited to any groups...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Groups;
