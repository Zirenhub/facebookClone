import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import useAuthContext from './useAuthContext';
import Friends from '../assets/friends.svg';
import Pfp from '../assets/pfp-one.svg';
import Bell from '../assets/bell.svg';
import Marketplace from '../assets/marketplace.svg';
import Home from '../assets/home.svg';
import Watch from '../assets/watch.svg';
import Groups from '../assets/groups.svg';
import Menu from '../assets/menu-bars.svg';
import TNotification from '../types/SocketIo';
import { Page } from '../types/Headers';

function useRoute(mobile: boolean) {
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [notifications, setNotifications] = useState<TNotification[]>([]);
  const [latestNotif, setLatestNotif] = useState<TNotification | null>(null);

  const auth = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

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

  const link = useMemo(
    () => (page: Page) => {
      setCurrentPage(page);
      if (page === 'profile') {
        navigate(`/${auth.user?._id}`);
      } else {
        navigate(`/${page}`);
      }
    },
    [navigate, auth]
  );

  const pages = useMemo(
    () => [
      {
        name: 'home',
        svg: Home,
        link: () => link('home'),
        route: 'both',
      },
      {
        name: 'groups',
        svg: Groups,
        link: () => link('groups'),
        route: 'mobile',
      },
      {
        name: 'friends',
        svg: Friends,
        link: () => link('friends'),
        route: 'both',
      },
      {
        name: 'profile',
        svg: Pfp,
        link: () => link('profile'),
        route: 'mobile',
      },
      {
        name: 'notifications',
        svg: Bell,
        link: () => link('notifications'),
        route: 'both',
      },
      {
        name: 'marketplace',
        svg: Marketplace,
        link: () => link('marketplace'),
        route: 'desktop',
      },
      {
        name: 'watch',
        svg: Watch,
        link: () => link('watch'),
        route: 'desktop',
      },
      {
        name: 'menu',
        svg: Menu,
        link: () => link('menu'),
        route: 'mobile',
      },
    ],
    [link]
  );

  const mobilePages = pages.filter(
    (p) => p.route === 'both' || p.route === 'mobile'
  );
  const desktopPages = pages.filter(
    (p) => p.route === 'both' || p.route === 'desktop'
  );

  useEffect(() => {
    const path = location.pathname.substring(1, location.pathname.length);
    if (auth.user?._id === path) {
      setCurrentPage('profile');
    } else if (pages.some((p) => p.name === path)) {
      setCurrentPage(path as Page);
    }
  }, [location, auth.user, mobile, pages]);

  return mobile
    ? {
        pages: mobilePages,
        notifications,
        latestNotif,
        currentPage,
        setNotifications,
      }
    : {
        pages: desktopPages,
        notifications,
        latestNotif,
        currentPage,
        setNotifications,
      };
}

export default useRoute;
