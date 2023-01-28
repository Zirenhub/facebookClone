import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';
import useRoute from '../../hooks/useRoute';
import FLogo from '../../assets/f-logo.svg';
import Messenger from '../../assets/messenger.svg';
import Menu from '../../assets/menu.svg';
import Pfp from '../../assets/pfp-two.svg';
import Bell from '../../assets/bell.svg';

function Header() {
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  const auth = useAuthContext();
  const pages = useRoute();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.substring(1, location.pathname.length);

    if (path === 'home') {
      setCurrentPage('home');
    } else if (path === 'friends') {
      setCurrentPage('friends');
    } else if (path === 'watch') {
      setCurrentPage('watch');
    } else if (path === 'marketplace') {
      setCurrentPage('marketplace');
    } else if (path === 'groups') {
      setCurrentPage('groups');
    } else {
      setCurrentPage(null);
    }
  }, [location, auth]);

  return (
    <header className="grid grid-cols-3 bg-white px-3 py-1 shadow-md">
      <div className="flex gap-5 items-center">
        <div className="shrink-0">
          <FLogo />
        </div>
        <div>
          <input
            placeholder="Search Facebook"
            className="p-2 bg-gray-100 rounded-full w-[64px] md:w-auto"
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        {pages.map((page) => {
          const active = currentPage === page.name;
          return (
            <button
              className="hover:bg-gray-100 grow rounded-md"
              type="button"
              key={page.name}
              onClick={page.link}
            >
              <div className="cursor-pointer py-2">
                <page.svg fill={active ? '#3b82f6' : '#65676b'} />
              </div>
              {active && <div className="border-b-4 border-blue-500" />}
            </button>
          );
        })}
      </div>
      <div className="flex justify-end items-center gap-2">
        <div className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300">
          <Menu />
        </div>
        <div className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300">
          <Messenger />
        </div>
        <div className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300">
          <Bell />
        </div>
        <div className="w-10 h-10 rounded-full cursor-pointer">
          <Pfp />
        </div>
      </div>
    </header>
  );
}

export default Header;
