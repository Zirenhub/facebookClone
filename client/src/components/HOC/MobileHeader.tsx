import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import facebookLogo from '../../assets/facebook-logo.svg';
import search from '../../assets/search.svg';
import plus from '../../assets/plus.svg';
import Messenger from '../svg/Messenger';
import useAuthContext from '../../hooks/useAuthContext';
import useRoute from '../../hooks/useRoute';

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
    } else {
      setCurrentPage(null);
    }
  }, [location, auth]);

  return (
    <>
      <header className="max-h-24 pb-3 border-b-2 border-slate-400">
        <div className="flex">
          <div className="grow flex justify-start">
            <img
              className="object-cover h-[42px] w-[146px]"
              alt="facebook logo"
              src={facebookLogo}
            />
          </div>
          <div className="flex gap-2 px-2 pt-1 items-center">
            <div className="bg-gray-200 w-9 h-9 p-1 rounded-full">
              <img src={plus} alt="post" className="block m-auto" />
            </div>
            <div className="bg-gray-200 w-9 h-9 p-1 rounded-full">
              <img src={search} alt="search" className="block m-auto" />
            </div>
            <div className="bg-gray-200 w-9 h-9 p-1 rounded-full">
              <Messenger fill="#00000" />
            </div>
          </div>
        </div>
        <div className="flex justify-between pt-2 items-center">
          {pages.map((page) => {
            return (
              <button
                type="button"
                className="grow"
                key={page.name}
                onClick={page.link}
              >
                <page.svg
                  fill={currentPage === page.name ? '#3b82f6' : '#65676b'}
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
