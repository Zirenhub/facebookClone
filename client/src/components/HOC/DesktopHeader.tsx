import { Outlet } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useRoute from '../../hooks/useRoute';
import Messenger from '../../assets/messenger.svg';
import Menu from '../../assets/menu.svg';
import Pfp from '../../assets/pfp-two.svg';
import Bell from '../../assets/bell.svg';

import DesktopMenu from '../../pages/Desktop/Menu';
import DesktopSearch from './DesktopSearch';

function Header() {
  const [menu, setMenu] = useState<boolean>(false);
  const [search, setSearch] = useState<boolean>(false);

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closePopups() {
      setSearch(false);
      setMenu(false);
    }
    const { current } = mainRef;
    current?.addEventListener('click', closePopups);
    return () => {
      current?.removeEventListener('click', closePopups);
    };
  }, []);

  const { pages, notifications, latestNotif, currentPage, setNotifications } =
    useRoute(false);

  return (
    <>
      <header className="grid grid-cols-3 bg-white px-3 max-h-20 shadow-md relative">
        <div className="flex items-center h-full gap-3 py-2">
          <DesktopSearch isOpen={!!search} setSearch={setSearch} />
        </div>
        <div className="flex justify-between items-center">
          {pages.map((page) => {
            const active = currentPage === page.name;
            return (
              <button
                className="hover:bg-gray-100 grow h-12 p-2 w-8 rounded-md"
                type="button"
                key={page.name}
                onClick={page.link}
              >
                <page.svg
                  fill={active ? '#3b82f6' : '#65676b'}
                  width="100%"
                  height="100%"
                />
                {active && <div className="border-b-4 border-blue-500 mt-2" />}
              </button>
            );
          })}
        </div>
        <div className="flex justify-end items-center gap-2 py-2">
          <button
            type="button"
            className={`h-full w-10 p-2 rounded-full flex justify-center items-center cursor-pointer  ${
              menu
                ? 'bg-blue-200 hover:bg-blue-300'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setMenu(!menu)}
          >
            <Menu height="100%" width="100%" fill={menu ? 'blue' : ''} />
          </button>
          <div className="bg-gray-200 h-full w-10 p-2 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300">
            <Messenger height="100%" width="100%" />
          </div>
          <div className="bg-gray-200 h-full w-10 p-2 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300">
            <Bell height="100%" width="100%" />
          </div>
          <div className="h-full w-10 rounded-full cursor-pointer">
            <Pfp height="100%" width="100%" />
          </div>
        </div>
        {menu && <DesktopMenu />}
      </header>
      <main className="overflow-auto grow" ref={mainRef}>
        <Outlet
          context={{
            notifications,
            clearNotifications: () => {
              if (notifications.length > 0) setNotifications([]);
            },
          }}
        />
      </main>
    </>
  );
}

export default Header;
