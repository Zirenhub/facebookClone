import { useNavigate } from 'react-router-dom';
import Pfp from '../../assets/pfp-two.svg';
import useAuthContext from '../../hooks/useAuthContext';

function HeaderProfile() {
  const navigate = useNavigate();
  const auth = useAuthContext();

  const buttonClass =
    'text-start hover:bg-gray-100 transition-all px-3 py-2 rounded-lg';

  return (
    <div className="flex flex-col bg-white rounded-lg p-3 shadow-md border">
      <div className="flex flex-col p-1 shadow-md rounded-lg border mb-4">
        <button
          type="button"
          onClick={() => navigate(`/${auth.user?._id}`)}
          className="flex gap-3 hover:bg-gray-100 transition-all p-3 rounded-lg"
        >
          <div className="h-8 w-8">
            <Pfp height="100%" width="100%" />
          </div>
          <p className="text-xl font-bold">{auth.user?.fullName}</p>
        </button>
        <div className="h-px bg-gray-300 my-2" />
        <button type="button" className={`text-blue-500 ${buttonClass}`}>
          See all profiles
        </button>
      </div>
      <button type="button" className={buttonClass}>
        Settings & privacy
      </button>
      <button type="button" className={buttonClass}>
        Help & support
      </button>
      <button type="button" className={buttonClass}>
        Display & accessibility
      </button>
      <button type="button" className={buttonClass}>
        Give feedback
      </button>
      <button type="button" className={buttonClass} onClick={auth.logOut}>
        Log out
      </button>
    </div>
  );
}

export default HeaderProfile;
