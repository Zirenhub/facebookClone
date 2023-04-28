import { useState } from 'react';
import CogWheel from '../../assets/cog-wheel.svg';
import HomeSVG from '../../assets/home.svg';
import AddFriendSVG from '../../assets/add-user.svg';
import ViewFriendSVG from '../../assets/plus-user.svg';
import BirthdaySVG from '../../assets/birthday.svg';
import FriendsSVG from '../../assets/friends.svg';
import EventsSVG from '../../assets/events.svg';
import FriendsRequests from '../../components/Friends/FriendsRequests';
import FriendsAccepted from '../../components/Friends/FriendsAccepted';

type TPage =
  | 'Home'
  | 'Friend Requests'
  | 'Suggestions'
  | 'All friends'
  | 'Birthdays'
  | 'Custom Lists';

function Friends() {
  const [currentPage, setCurrentPage] = useState<TPage>('Home');

  const underWork = (
    <p className="text-center font-bold text-2xl text-dimGray">
      Nothing here as of yet.
    </p>
  );

  const pages: {
    page: TPage;
    src: React.FC<React.SVGProps<SVGElement>>;
    comp: JSX.Element;
  }[] = [
    { page: 'Home', src: HomeSVG, comp: <FriendsRequests /> },
    { page: 'Friend Requests', src: AddFriendSVG, comp: <FriendsRequests /> },
    { page: 'Suggestions', src: ViewFriendSVG, comp: underWork },
    { page: 'All friends', src: FriendsSVG, comp: <FriendsAccepted /> },
    { page: 'Birthdays', src: BirthdaySVG, comp: underWork },
    { page: 'Custom Lists', src: EventsSVG, comp: underWork },
  ];

  return (
    <div className="flex h-full bg-gray-100">
      <div className="flex flex-col gap-2 bg-white shadow-md p-3 basis-80">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold">Friends</p>
          <button
            type="button"
            className="h-10 w-10 p-2 bg-gray-200 rounded-full"
          >
            <CogWheel height="100%" width="100%" />
          </button>
        </div>
        {pages.map((p) => {
          const isCurrentPage = currentPage === p.page;
          return (
            <button
              type="button"
              key={p.page}
              onClick={() => setCurrentPage(p.page)}
              className={`p-2 flex items-center gap-4 text-lg rounded-lg text-start ${
                isCurrentPage ? 'bg-gray-100' : 'hover:bg-gray-100'
              } transition-all`}
            >
              <div
                className={`h-11 w-11 p-2 ${
                  isCurrentPage ? 'bg-blue-500' : 'bg-gray-200'
                } rounded-full`}
              >
                <p.src
                  height="100%"
                  width="100%"
                  fill={isCurrentPage ? 'white' : 'gray'}
                />
              </div>
              {p.page}
            </button>
          );
        })}
      </div>
      <div className="grow flex p-5 justify-center">
        <div className="overflow-scroll basis-96">
          {pages.find((p) => p.page === currentPage)?.comp}
        </div>
      </div>
    </div>
  );
}

export default Friends;
