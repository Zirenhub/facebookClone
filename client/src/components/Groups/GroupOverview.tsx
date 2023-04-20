import { TGroup } from '../../types/Group';
import stringShortener from '../../utils/stringShortener';

type Props = {
  group: TGroup;
  openGroup: () => void;
};

function GroupOverview({ group, openGroup }: Props) {
  return (
    <button
      type="button"
      onClick={openGroup}
      className="bg-gray-100 p-3 my-2 rounded-md w-full shadow-sm flex items-center justify-between"
    >
      <p className="font-bold text-xl">{stringShortener(group.name, 16)}</p>
      <p className="text-dimBlack">{group.invited.length + 1} members</p>
    </button>
  );
}

export default GroupOverview;
