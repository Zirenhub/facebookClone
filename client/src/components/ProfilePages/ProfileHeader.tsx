import { useNavigate } from 'react-router-dom';
import BackButton from '../utils/BackButton';
import pfp from '../../assets/pfp.svg';

function ProfileHeader({ fullName }: { fullName: string }) {
  const navigate = useNavigate();

  return (
    <header className="flex flex-col border-b-2 mb-20">
      <div className="flex p-2">
        <BackButton
          close={() => {
            navigate('/home');
          }}
        />
        <p className="font-bold">{fullName}</p>
      </div>
      <div className="w-full h-36 bg-gray-300" />
      <div className="absolute flex flex-col top-24 pl-2">
        <img
          src={pfp}
          alt="profile"
          className="w-32 h-32 bg-gray-500 rounded-full"
        />
        <p className="font-bold text-2xl">{fullName}</p>
      </div>
    </header>
  );
}

export default ProfileHeader;
