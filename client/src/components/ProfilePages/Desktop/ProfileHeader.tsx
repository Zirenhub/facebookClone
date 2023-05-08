/* eslint-disable react/jsx-no-useless-fragment */
import Pfp from '../../../assets/pfp-two.svg';
import ProfileRequestButton from '../ProfileRequestButton';
import { DesktopHeaderButtons, TProfileFriend } from '../../../types/Profile';
import useAuthContext from '../../../hooks/useAuthContext';

type Props = {
  fullName: string;
  currentPage: DesktopHeaderButtons;
  setCurrentPage: React.Dispatch<React.SetStateAction<DesktopHeaderButtons>>;
  friendStatus?: TProfileFriend | null;
  requestMutation?: () => void;
};

function ProfileHeader({
  fullName,
  currentPage,
  setCurrentPage,
  friendStatus,
  requestMutation,
}: Props) {
  const auth = useAuthContext();

  const buttons: DesktopHeaderButtons[] = [
    'Posts',
    'About',
    'Friends',
    'Photos',
    'Videos',
    'Check-ins',
    'More',
  ];

  function myProfileHeader() {
    return (
      <div className="flex flex-col items-end justify-between">
        <button
          type="button"
          className="rounded-lg bg-white font-bold px-4 py-2 hover:bg-gray-100"
        >
          Add cover photo
        </button>
        <div className="flex gap-3">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600"
          >
            Add to story
          </button>
          <button
            type="button"
            className="bg-gray-200 px-4 py-2 font-bold rounded-lg hover:bg-gray-300"
          >
            Edit pofile
          </button>
        </div>
      </div>
    );
  }

  function strangerProfileHeader() {
    if (requestMutation) {
      return (
        <div className="flex items-end gap-3">
          <ProfileRequestButton
            friendStatus={friendStatus || null}
            requestMutation={requestMutation}
            myID={auth.user?._id || ''}
            btnClass="px-4 py-2 rounded-lg text-white font-bold"
          />
          <button
            type="button"
            className="bg-gray-200 px-4 py-2 font-bold rounded-lg hover:bg-gray-300"
          >
            Message
          </button>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="flex flex-col pb-1">
      <div className="h-[350px] w-full top-0 absolute min-[1200px]:rounded-lg bg-gradient-to-b from-white to-gray-400" />
      <div className="mt-[275px] z-10 px-6">
        <div className="flex justify-between">
          <div className="flex items-end">
            <div className="h-32 w-32 border-2 rounded-full bg-white border-white">
              <Pfp height="100%" width="100%" stroke="white" />
            </div>
            <p className="font-bold text-2xl">{fullName}</p>
          </div>
          {requestMutation ? strangerProfileHeader() : myProfileHeader()}
        </div>
      </div>
      <div className="h-px bg-gray-300 mt-6 mb-2" />
      <div className="flex justify-between items-center px-6">
        <div className="flex">
          {buttons.map((b) => {
            const btnClass = `p-3 ${
              currentPage === b
                ? 'text-blue-500 border-b-4 border-blue-500'
                : 'hover:bg-gray-200 text-dimGray rounded-lg'
            }  transition-all font-bold text-xl`;

            return (
              <button
                type="button"
                key={b}
                className={btnClass}
                onClick={() => setCurrentPage(b)}
              >
                {b}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className="px-3 h-fit bg-gray-200 rounded-lg text-2xl"
        >
          ...
        </button>
      </div>
    </div>
  );
}

ProfileHeader.defaultProps = {
  friendStatus: undefined,
  requestMutation: undefined,
};

export default ProfileHeader;
