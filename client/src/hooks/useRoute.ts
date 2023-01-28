import { useNavigate } from 'react-router-dom';
import Bell from '../components/svg/Bell';
import Pfp from '../components/svg/Pfp';
import Menu from '../components/svg/Menu';
import Home from '../components/svg/Home';
import Friends from '../components/svg/Friends';
import Watch from '../components/svg/Watch';
import useAuthContext from './useAuthContext';
import Marketplace from '../components/svg/Marketplace';
import Groups from '../components/svg/Groups';

function useRoute() {
  const isMobile = window.innerWidth <= 500;

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

  return isMobile
    ? [home, friends, watch, profile, notifications, menu]
    : [home, friends, watch, marketplace, groups];
}

export default useRoute;
