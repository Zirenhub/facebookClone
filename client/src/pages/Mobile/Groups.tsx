import { useState } from 'react';
import CreateGroupModal from '../../components/Groups/CreateGroupModal';
import Loading from '../../components/Loading';
import useGroups from '../../hooks/useGroups';
import DisplayGroups from '../../components/Groups/DisplayGroups';
import { TGroup } from '../../types/Group';
import GroupChat from '../../components/Groups/Mobile/GroupChat';

function Groups() {
  const [createGroupModal, setCreateGroupModal] = useState<boolean>(false);

  const { groups, setOpenGroup, openGroup, isLoading, isError, error } =
    useGroups();

  if (openGroup) {
    return <GroupChat group={openGroup} close={() => setOpenGroup(null)} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div>
        <p>{error?.message}</p>
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
        <CreateGroupModal close={() => setCreateGroupModal(false)} isMobile />
      ) : (
        <DisplayGroups
          groups={groups}
          setOpenGroup={(g: TGroup) => setOpenGroup(g)}
        />
      )}
    </div>
  );
}

export default Groups;
