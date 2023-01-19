import facebookLogo from '../../../assets/facebook-logo.svg';
import search from '../../../assets/search.svg';
import menu from '../../../assets/menu-bars.svg';
import Home from '../../svg/Home';
import Friends from '../../svg/Friends';
import Watch from '../../svg/Watch';
import Groups from '../../svg/Groups';
import Messenger from '../../svg/Messenger';
import Bell from '../../svg/Bell';

function Header({ activePage }: { activePage: string }) {
  const pages = [
    { name: 'home', svg: Home },
    { name: 'friends', svg: Friends },
    { name: 'messenger', svg: Messenger },
    { name: 'watch', svg: Watch },
    { name: 'notifications', svg: Bell },
    { name: 'groups', svg: Groups },
  ];

  return (
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
            <img src={search} alt="search" className="block m-auto" />
          </div>
          <div className="bg-gray-200 w-9 h-9 p-1 rounded-full">
            <img src={menu} alt="menu" className="block m-auto" />
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-2 items-center">
        {pages.map((page) => {
          return (
            <div className="grow" key={page.name}>
              <page.svg
                fill={activePage === page.name ? '#3b82f6' : '#65676b'}
              />
            </div>
          );
        })}
      </div>
    </header>
  );
}

export default Header;
