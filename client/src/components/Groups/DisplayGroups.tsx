import { TGroup, TGroups } from '../../types/Group';
import GroupOverview from './GroupOverview';

type Props = {
  groups: TGroups;
  setOpenGroup: (g: TGroup) => void;
};

function DisplayGroups({ groups, setOpenGroup }: Props) {
  return (
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
  );
}

export default DisplayGroups;
