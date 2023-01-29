import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';
import useRoute from '../../hooks/useRoute';
import facebookLogo from '../../assets/facebook-logo.png';
import Plus from '../../assets/plus.svg';
import Search from '../../assets/search.svg';
import Messenger from '../../assets/messenger.svg';

function MobileHeader() {
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  const auth = useAuthContext();
  const pages = useRoute();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.substring(1, location.pathname.length);

    if (path === 'home') {
      setCurrentPage('home');
    } else if (path === auth.user?._id) {
      setCurrentPage('profile');
    } else if (path === 'menu') {
      setCurrentPage('menu');
    } else if (path === 'friends') {
      setCurrentPage('friends');
    } else {
      setCurrentPage(null);
    }
  }, [location, auth]);

  return (
    <>
      <header className="max-h-24 px-3 py-2 border-b-2 border-slate-400">
        <div className="flex">
          <div className="h-8">
            <img
              src={facebookLogo}
              alt="facebook logo"
              className="w-[120px] h-full object-contain"
            />
          </div>
          <div className="flex gap-2 items-center grow justify-end">
            <div className="bg-gray-200 rounded-full h-8 w-8 flex justify-center items-center">
              <Plus height="100%" width="70%" />
            </div>
            <div className="bg-gray-200 rounded-full h-8 w-8 flex justify-center items-center">
              <Search height="100%" width="70%" />
            </div>
            <div className="bg-gray-200 rounded-full h-8 w-8 flex justify-center items-center">
              <Messenger height="100%" width="70%" />
            </div>
          </div>
        </div>
        <div className="flex pt-2 items-center justify-between">
          {pages.map((page) => {
            return (
              <button
                type="button"
                className="h-8 w-8"
                key={page.name}
                onClick={page.link}
              >
                <page.svg
                  fill={currentPage === page.name ? '#3b82f6' : '#65676b'}
                  width="100%"
                  height="100%"
                />
              </button>
            );
          })}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MobileHeader;
