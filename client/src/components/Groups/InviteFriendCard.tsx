import { useNavigate } from 'react-router-dom';
import { TProfileDefault } from '../../types/Profile';
import Pfp from '../../assets/pfp-two.svg';

type Props = {
  friend: TProfileDefault;
  handleInvite: () => void;
  handleRemove: () => void;
  isInvited: boolean;
};

function InviteFriendCard({
  friend,
  handleInvite,
  handleRemove,
  isInvited,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-gray-100 p-3 rounded-md">
      <button
        type="button"
        onClick={() => navigate(`/${friend._id}`)}
        className="flex flex-col items-center"
      >
        <div className="h-12 w-12">
          <Pfp height="100%" width="100%" />
        </div>
        <p>{friend.fullName}</p>
      </button>
      <button
        type="button"
        className={`${
          isInvited ? 'bg-red-500' : 'bg-green-500'
        } rounded-full px-2 text-white mt-4 justify-self-center`}
        onClick={isInvited ? handleRemove : handleInvite}
      >
        {isInvited ? 'Remove' : 'Invite'}
      </button>
    </div>
  );
}

export default InviteFriendCard;
