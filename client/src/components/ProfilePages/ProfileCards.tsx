/* eslint-disable react/jsx-no-useless-fragment */
import { useNavigate } from 'react-router-dom';
import Pfp from '../../assets/pfp-two.svg';
import { TProfileDefault } from '../../types/Profile';

type Props = {
  profiles: TProfileDefault[];
  onClick?: () => void;
};

function ProfileCards({ profiles, onClick }: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2">
      {profiles?.map((profile) => (
        <div key={profile._id}>
          <button
            type="button"
            onClick={() => {
              if (onClick) {
                onClick();
              }
              navigate(`/${profile._id}`);
            }}
            className="bg-gray-200 transition-all rounded-lg hover:bg-gray-300 shadow-sm p-3 w-full"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10">
                <Pfp height="100%" width="100%" />
              </div>
              <p>{profile.fullName}</p>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
}

ProfileCards.defaultProps = {
  onClick: undefined,
};

export default ProfileCards;
