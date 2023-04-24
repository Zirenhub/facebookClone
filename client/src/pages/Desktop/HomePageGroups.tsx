import { useState } from 'react';
import DisplayGroups from '../../components/Groups/DisplayGroups';
import { TGroup, TGroups } from '../../types/Group';
import CreateGroupModal from '../../components/Groups/CreateGroupModal';

type Props = {
  groups: TGroups;
  setOpenGroup: React.Dispatch<React.SetStateAction<TGroup | null>>;
};

function HomePageGroups({ groups, setOpenGroup }: Props) {
  const [createGroupModal, setCreateGroupModal] = useState(false);

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
        className="bg-gray-200 text-start font-bold text-md rounded-lg p-2 hover:bg-gray-300 transition-all"
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
