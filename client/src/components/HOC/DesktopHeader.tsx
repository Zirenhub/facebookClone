import { Outlet } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import useRoute from '../../hooks/useRoute';
import Messenger from '../../assets/messenger.svg';
import Menu from '../../assets/menu.svg';
import Pfp from '../../assets/pfp-two.svg';
import Bell from '../../assets/bell.svg';
import HeaderMenu from './HeaderMenu';
import HeaderSearch from './HeaderSearch';
import HeaderProfile from './HeaderProfile';
import { TProfileDefault } from '../../types/Profile';
import HeaderMessenger from './HeaderMessenger';
import DesktopChats from './DesktopChats';

type TModal = 'menu' | 'profile' | 'messenger' | 'bell';
type TChats = {
  active: TProfileDefault[];
  minimized: TProfileDefault[];
};
type THeaderModals = {
  modal: TModal;
  Src: React.FC<React.SVGProps<SVGElement>>;
  Comp: JSX.Element;
}[];

function Header() {
  const [currentModal, setCurrentModal] = useState<TModal | 'search' | null>(
    null
  );
  const [chats, setChats] = useState<TChats>({ active: [], minimized: [] });
  const mainRef = useRef<HTMLDivElement>(null);

  const addChat = (profile: TProfileDefault) => {
    const isActive = chats.active.some((x) => x._id === profile._id);
    if (!isActive) {
      setChats((prevChats) => {
        const isMinimized = prevChats.minimized.some(
          (x) => x._id === profile._id
        );
        return {
          minimized: isMinimized
            ? prevChats.minimized.filter((c) => c._id !== profile._id)
            : prevChats.minimized,
          active: [...prevChats.active, profile],
        };
      });
    }
  };

  const closeChat = (profileID: string, state: 'active' | 'minimized') => {
    setChats((prevChats) => {
      const modifiedChats = prevChats[state].filter((c) => c._id !== profileID);
      return {
        ...prevChats,
        [state]: modifiedChats,
      };
    });
  };

  const minimizeChat = (profileID: string) => {
    const profile = chats.active.find((p) => p._id === profileID);
    if (profile) {
      const modifiedActive = chats.active.filter((c) => c._id !== profileID);
      setChats({
        active: modifiedActive,
        minimized: [...chats.minimized, profile],
      });
    }
  };

  useEffect(() => {
    // useEffect for when clicking on main container, close any modal that might be open.
    function closePopups() {
      if (currentModal) {
        setCurrentModal(null);
      }
    }
    const { current } = mainRef;
    current?.addEventListener('click', closePopups);
    return () => {
      current?.removeEventListener('click', closePopups);
    };
  }, [currentModal]);

  const { pages, notifications, latestNotif, currentPage } = useRoute(false);

  const activeChats = useMemo(() => chats.active, [chats.active]);
  const minimizedChats = useMemo(() => chats.minimized, [chats.minimized]);

  const headerModals: THeaderModals = [
    { modal: 'menu', Src: Menu, Comp: <HeaderMenu /> },
    { modal: 'profile', Src: Pfp, Comp: <HeaderProfile /> },
    {
      modal: 'messenger',
      Src: Messenger,
      Comp: <HeaderMessenger addChat={addChat} />,
    },
    { modal: 'bell', Src: Bell, Comp: <p>Test</p> },
  ];

  function getOpenModal() {
    const modal = headerModals.find((m) => m.modal === currentModal);
    return modal ? modal.Comp : null;
  }

  return (
    <>
      <header className="grid grid-cols-[1fr_2fr_1fr] px-3 shadow-lg z-30 relative">
        <div className="flex items-center h-full gap-3 py-2">
          <HeaderSearch
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
          {headerModals.map((b) => {
            const { modal, Src } = b;
            return (
              <button
                type="button"
                key={modal}
                className={`bg-gray-200 h-full w-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300 ${
                  currentModal === modal ? 'bg-blue-200 hover:bg-blue-300' : ''
                } ${modal === 'profile' ? '' : 'p-2'}`}
                onClick={() =>
                  setCurrentModal(currentModal === modal ? null : modal)
                }
              >
                <Src height="100%" width="100%" />
              </button>
            );
          })}
        </div>
        {currentModal && currentModal !== 'search' && (
          <div className="absolute top-12 right-2">{getOpenModal()}</div>
        )}
      </header>
      <main className="overflow-auto grow" ref={mainRef}>
        <Outlet />
      </main>
      <DesktopChats
        activeChats={activeChats}
        minimizedChats={minimizedChats}
        closeChat={closeChat}
        addChat={addChat}
        minimizeChat={minimizeChat}
      />
    </>
  );
}

export default Header;
