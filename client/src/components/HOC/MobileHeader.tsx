import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';
import useRoute from '../../hooks/useRoute';
import facebookLogo from '../../assets/facebook-logo.png';
import Plus from '../../assets/plus.svg';
import Search from '../../assets/search.svg';
import Messenger from '../../assets/messenger.svg';
import SearchPage from '../../pages/Mobile/SearchPage';

function MobileHeader() {
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  const [searchPage, setSearchPage] = useState<boolean>(false);

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

  if (searchPage) {
    return <SearchPage close={() => setSearchPage(false)} />;
  }

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
            <button
              type="button"
              onClick={() => setSearchPage(true)}
              className="bg-gray-200 rounded-full h-8 w-8 flex justify-center items-center"
            >
              <Search height="100%" width="70%" />
            </button>
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
      <main className="grow">
        <Outlet />
      </main>
    </>
  );
}

export default MobileHeader;
