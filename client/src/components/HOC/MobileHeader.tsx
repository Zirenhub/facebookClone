import { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';
import useRoute from '../../hooks/useRoute';
import facebookLogo from '../../assets/facebook-logo.png';
import Plus from '../../assets/plus.svg';
import Search from '../../assets/search.svg';
import Messenger from '../../assets/messenger.svg';
import MessengerPage from '../../pages/Mobile/Messenger';
import SearchPage from '../../pages/Mobile/SearchPage';
import TNotification from '../../types/SocketIo';
import NotificationMsg from './getNotificationMsg';

type Page =
  | 'home'
  | 'profile'
  | 'menu'
  | 'friends'
  | 'notifications'
  | 'groups';

function MobileHeader() {
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [searchPage, setSearchPage] = useState<boolean>(false);
  const [messengerPage, setMessengerPage] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<TNotification[]>([]);
  const [latestNotif, setLatestNotif] = useState<TNotification | null>(null);

  const auth = useAuthContext();
  const pages = useRoute(true);

  useEffect(() => {
    function addNotification(notif: TNotification) {
      setLatestNotif(notif);
      setNotifications([...notifications, notif]);

      setTimeout(() => {
        setLatestNotif(null);
      }, 7000);
    }

    auth.socket?.on('notification', addNotification);

    return () => {
      auth.socket?.off('notification', addNotification);
    };
  }, [auth, notifications]);

  if (searchPage) {
    return <SearchPage close={() => setSearchPage(false)} />;
  }

  if (messengerPage) {
    return <MessengerPage close={() => setMessengerPage(false)} />;
  }

  return (
    <>
      <header className="max-h-24 px-3 py-2 border-b-2 border-slate-400 bg-white">
        {latestNotif && (
          <div className="absolute text-center z-50 top-10 p-3 bg-gray-100 rounded-full w-full left-2/4 -translate-x-2/4">
            <NotificationMsg notification={latestNotif} />
          </div>
        )}
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
            <button
              type="button"
              onClick={() => setMessengerPage(true)}
              className="bg-gray-200 rounded-full h-8 w-8 flex justify-center items-center"
            >
              <Messenger height="100%" width="70%" />
            </button>
          </div>
        </div>
        <div className="flex pt-2 items-center justify-between">
          {pages.map((page) => {
            return (
              <button
                type="button"
                className="h-8 w-8 relative"
                key={page.name}
                onClick={page.link}
              >
                <page.svg
                  fill={currentPage === page.name ? '#3b82f6' : '#65676b'}
                  width="100%"
                  height="100%"
                />
                {page.name === 'notifications' && notifications.length > 0 && (
                  <div className="h-5 w-5 flex justify-center items-center absolute top-0 right-0 text-white p-2 bg-red-500 rounded-full">
                    <p>{notifications.length}</p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </header>
      <main className="overflow-auto grow">
        <Outlet
          context={{
            notifications,
            clearNotifications: () => {
              if (notifications.length) setNotifications([]);
            },
            setPage: (page: Page | null) => {
              setCurrentPage(page);
            },
          }}
        />
      </main>
    </>
  );
}

type OutletContextType = {
  notifications: TNotification[];
  clearNotifications: () => void;
  setPage: (page: Page | null) => void;
};

function useHeader() {
  return useOutletContext<OutletContextType>();
}

export { MobileHeader, useHeader };
