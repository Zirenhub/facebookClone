import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../../hooks/useAuthContext';
import { logOutUser } from '../../../api/auth';
import pfp from '../../../assets/pfp.svg';
import BackButton from '../../utils/BackButton';

// put space between search and right side
function Bookmarks({ close }: { close: () => void }) {
  const auth = useAuthContext();
  const navigate = useNavigate();

  function navigateProfile() {
    navigate(`/${auth.user?._id}`);
  }

  async function handleLogOut() {
    const res = await logOutUser();
    if (res.status === 'success') {
      auth.dispatch({ type: 'LOGOUT' });
    } else {
      // handle error
    }
  }

  return (
    <div className="bg-white z-10 h-full w-full absolute overflow-auto">
      <header className="flex min-h-[50px] p-2 border-b-2 border-gray-300">
        <BackButton close={close} />
        <button
          type="button"
          className="px-4 bg-gray-200 rounded-full grow text-dimBlack"
        >
          Search Facebook
        </button>
      </header>
      <div
        className="flex gap-2 py-2 mx-2 border-b-2 border-gray-300 cursor-pointer"
        onClick={navigateProfile}
        onKeyDown={navigateProfile}
        role="button"
        tabIndex={0}
      >
        <div>
          <img src={pfp} alt="profile" className="w-pfp" />
        </div>
        <div>
          <p>
            {auth.user?.firstName} {auth.user?.lastName}
          </p>
          <p className="text-dimGray">View your profile</p>
        </div>
      </div>
      <div className="flex flex-col items-start gap-5 p-3">
        <button type="button">COVID-19 Information Center</button>
        <button type="button">Live videos</button>
        <button type="button">Messages</button>
        <button type="button">Groups</button>
        <button type="button">Marketplace</button>
        <button type="button">Friends</button>
        <button type="button">Videos On Watch</button>
        <button type="button">Pages</button>
        <button type="button">Saved</button>
        <button type="button">Memories</button>
        <button type="button">Events</button>
        <button type="button">Games</button>
        <button type="button">Climate Science Information Center</button>
        <button type="button">Ads Manager</button>
        <button type="button">Orders and payments</button>
        <button type="button">Most recent</button>
        <button type="button">Settings</button>
        <button type="button">Dark mode</button>
        <button type="button">Privacy shortcuts</button>
        <button type="button">Language</button>
        <button type="button">Help</button>
        <button type="button">Support Inbox</button>
        <button type="button">About</button>
        <button type="button">Report a problem</button>
        <button type="button" onClick={handleLogOut}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default Bookmarks;
