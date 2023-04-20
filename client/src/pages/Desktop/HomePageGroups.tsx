import { useState } from 'react';
import DisplayGroups from '../../components/Groups/DisplayGroups';
import useGroups from '../../hooks/useGroups';
import { TGroup } from '../../types/Group';
import CreateGroupModal from '../../components/Groups/CreateGroupModal';

function HomePageGroups() {
  const [createGroupModal, setCreateGroupModal] = useState(false);
  const { groups, setOpenGroup, openGroup, isLoading, isError, error } =
    useGroups();

  if (openGroup) {
    // todo
  }

  return (
    <div className="flex flex-col overflow-y-scroll w-[280px]">
      {createGroupModal && (
        <CreateGroupModal
          isMobile={false}
          close={() => setCreateGroupModal(false)}
        />
      )}
      <button
        type="button"
        onClick={() => setCreateGroupModal(true)}
        className="bg-gray-200 text-start font-bold text-md rounded-lg p-2"
      >
        Create Group
      </button>
      <DisplayGroups
        groups={groups}
        setOpenGroup={(g: TGroup) => setOpenGroup(g)}
      />
    </div>
  );
}

export default HomePageGroups;
