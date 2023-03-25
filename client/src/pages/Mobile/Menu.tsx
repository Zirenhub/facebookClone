import { useNavigate } from 'react-router-dom';
import Search from '../../assets/search.svg';
import CogWheel from '../../assets/cog-wheel.svg';
import Pfp from '../../assets/pfp-two.svg';
import useAuthContext from '../../hooks/useAuthContext';
import { logOutUser } from '../../api/auth';
import useSocketContext from '../../hooks/useSocketContext';

function MobileMenu() {
  const auth = useAuthContext();
  const socket = useSocketContext();
  const navigate = useNavigate();

  async function handleLogOut() {
    const res = await logOutUser();
    if (res.status === 'success') {
      socket.socket?.disconnect();
      socket.socket?.off();
      auth.dispatch({ type: 'LOGOUT' });
    }
  }

  return (
    <div className="bg-gray-200 flex flex-col py-5 px-3 h-full">
      <header className="flex flex-col pb-4 border-b-2 border-gray-400">
        <div className="flex justify-between items-center">
          <p className="font-bold text-3xl">Menu</p>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-full p-2 h-10 w-10 bg-gray-300"
            >
              <CogWheel height="100%" width="100%" />
            </button>
            <button
              type="button"
              className="rounded-full p-2 h-10 w-10 bg-gray-300"
            >
              <Search height="100%" width="100%" />
            </button>
          </div>
        </div>
        <div
          className="flex gap-3"
          onClick={() => navigate(`/${auth.user?._id}`)}
          onKeyDown={() => navigate(`/${auth.user?._id}`)}
          tabIndex={0}
          role="button"
        >
          <div className="h-12 w-12">
            <Pfp height="100%" width="100%" />
          </div>
          <div className="flex flex-col">
            <p>{auth.user?.fullName}</p>
            <p className="text-dimGray">See your profile</p>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-2 gap-2 mt-3 grow">
        <button type="button" className="bg-white p-3 rounded-md shadow-md">
          Find friends
        </button>
        <button type="button" className="bg-white p-3 rounded-md shadow-lg">
          Feeds
        </button>
        <button type="button" className="bg-white p-3 rounded-md shadow-lg">
          Groups
        </button>
        <button type="button" className="bg-white p-3 rounded-md shadow-lg">
          Marketplace
        </button>
        <button type="button" className="bg-white p-3 rounded-md shadow-md">
          Vides on Watch
        </button>
        <button type="button" className="bg-white p-3 rounded-md shadow-lg">
          Memories
        </button>
        <button type="button" className="bg-white p-3 rounded-md shadow-lg">
          Saved
        </button>
        <button type="button" className="bg-white p-3 rounded-md shadow-lg">
          Pages
        </button>
        <button type="button" className="bg-white p-3 rounded-md shadow-lg">
          Reels
        </button>
        <button type="button" className="bg-white p-3 rounded-md shadow-lg">
          Gaming
        </button>
      </div>
      <div className="w-full mt-5">
        <button
          type="button"
          className="bg-gray-300 w-full rounded-md py-2 font-bold"
          onClick={handleLogOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default MobileMenu;
