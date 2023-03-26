import { useNavigate } from 'react-router-dom';
import useAuthContext from './useAuthContext';
import Friends from '../assets/friends.svg';
import Pfp from '../assets/pfp-one.svg';
import Bell from '../assets/bell.svg';
import Marketplace from '../assets/marketplace.svg';
import Home from '../assets/home.svg';
import Watch from '../assets/watch.svg';
import Groups from '../assets/groups.svg';
import Menu from '../assets/menu-bars.svg';

function useRoute(mobile: boolean) {
  const auth = useAuthContext();
  const navigate = useNavigate();

  const friends = {
    name: 'friends',
    svg: Friends,
    link: () => navigate('/friends'),
  };
  const profile = {
    name: 'profile',
    svg: Pfp,
    link: () => navigate(`/${auth.user?._id}`),
  };
  const notifications = {
    name: 'notifications',
    svg: Bell,
    link: () => navigate('/notifications'),
  };
  const marketplace = {
    name: 'marketplace',
    svg: Marketplace,
    link: () => navigate('/marketplace'),
  };
  const groups = {
    name: 'groups',
    svg: Groups,
    link: () => navigate('/groups'),
  };
  const home = { name: 'home', svg: Home, link: () => navigate('/home') };
  const watch = { name: 'watch', svg: Watch, link: () => navigate('/watch') };
  const menu = { name: 'menu', svg: Menu, link: () => navigate('/menu') };

  return mobile
    ? [home, friends, watch, profile, notifications, menu]
    : [home, friends, watch, marketplace, groups];
}

export default useRoute;
