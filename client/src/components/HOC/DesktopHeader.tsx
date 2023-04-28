import { Outlet } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useRoute from '../../hooks/useRoute';
import Messenger from '../../assets/messenger.svg';
import Menu from '../../assets/menu.svg';
import Pfp from '../../assets/pfp-two.svg';
import Bell from '../../assets/bell.svg';
import DesktopMenu from './Menu';
import DesktopSearch from './DesktopSearch';
import HeaderProfile from './HeaderProfile';

type TModal = 'search' | 'menu' | 'profile';

function Header() {
  const [currentModal, setCurrentModal] = useState<TModal | null>(null);

  const mainRef = useRef<HTMLDivElement>(null);
  const headerBtnClass =
    'bg-gray-200 h-full w-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300';

  useEffect(() => {
    function closePopups() {
      setCurrentModal(null);
    }
    const { current } = mainRef;
    current?.addEventListener('click', closePopups);
    return () => {
      current?.removeEventListener('click', closePopups);
    };
  }, []);

  function headerButton(modal: 'menu' | 'profile') {
    return (
      <button
        type="button"
        className={`${headerBtnClass} ${
          currentModal === modal ? 'bg-blue-200 hover:bg-blue-300' : ''
        } ${modal === 'menu' ? 'p-2' : ''}`}
        onClick={() => setCurrentModal(currentModal === modal ? null : modal)}
      >
        {modal === 'menu' ? (
          <Menu
            height="100%"
            width="100%"
            fill={currentModal === 'menu' ? 'blue' : ''}
          />
        ) : (
          <Pfp height="100%" width="100%" />
        )}
      </button>
    );
  }

  const { pages, notifications, latestNotif, currentPage, setNotifications } =
    useRoute(false);

  return (
    <>
      <header className="grid grid-cols-[1fr_2fr_1fr] px-3 shadow-lg z-30 relative">
        <div className="flex items-center h-full gap-3 py-2">
          <DesktopSearch
            isOpen={currentModal === 'search'}
            setSearch={(bool: boolean) =>
              setCurrentModal(bool ? 'search' : null)
            }
          />
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
          {headerButton('menu')}
          <div className={`${headerBtnClass} p-2`}>
            <Messenger height="100%" width="100%" />
          </div>
          <div className={`${headerBtnClass} p-2`}>
            <Bell height="100%" width="100%" />
          </div>
          {headerButton('profile')}
        </div>
        {currentModal && (
          <div className="absolute top-12 right-2">
            {currentModal === 'menu' && <DesktopMenu />}
            {currentModal === 'profile' && <HeaderProfile />}
          </div>
        )}
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
