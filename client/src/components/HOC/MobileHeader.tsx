import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import facebookLogo from '../../assets/facebook-logo.svg';
import search from '../../assets/search.svg';
import plus from '../../assets/plus.svg';
import Menu from '../svg/Menu';
import Home from '../svg/Home';
import Friends from '../svg/Friends';
import Watch from '../svg/Watch';
import Messenger from '../svg/Messenger';
import Bell from '../svg/Bell';
import Pfp from '../svg/Pfp';
import useAuthContext from '../../hooks/useAuthContext';

function MobileHeader() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  const auth = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const pages = [
    { name: 'home', svg: Home },
    { name: 'friends', svg: Friends },
    { name: 'watch', svg: Watch },
    { name: 'profile', svg: Pfp },
    { name: 'notifications', svg: Bell },
    { name: 'menu', svg: Menu },
  ];

  function handleNavigate(page: string) {
    switch (page) {
      case 'profile':
        navigate(`/${auth.user?._id}`);
        break;
      case 'home':
        navigate('/home');
        break;
      default:
    }
  }

  useEffect(() => {
    switch (location.pathname) {
      case '/home':
        setCurrentPage('home');
        break;
      default:
        setCurrentPage('profile');
    }
  }, [location]);

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
                onClick={() => handleNavigate(page.name)}
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
