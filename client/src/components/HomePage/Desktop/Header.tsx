import fLogo from '../../../assets/f-logo.svg';
import Home from '../../svg/Home';
import Friends from '../../svg/Friends';
import Watch from '../../svg/Watch';
import Marketplace from '../../svg/Marketplace';
import Groups from '../../svg/Groups';
import Messenger from '../../svg/Messenger';
import Bell from '../../svg/Bell';
import menu from '../../../assets/menu.svg';
import pfp from '../../../assets/pfp.svg';

function Header({ activePage }: { activePage: string }) {
  const pages = [
    { name: 'home', svg: Home },
    { name: 'friends', svg: Friends },
    { name: 'watch', svg: Watch },
    { name: 'marketplace', svg: Marketplace },
    { name: 'groups', svg: Groups },
  ];

  return (
    <header className="grid grid-cols-3 bg-white px-3 py-1 shadow-md">
      <div className="flex gap-5 items-center">
        <div className="shrink-0">
          <img src={fLogo} alt="facebook logo" className="min-h-[40px]" />
        </div>
        <div>
          <input
            placeholder="Search Facebook"
            className="p-2 bg-gray-100 rounded-full w-[64px] md:w-auto"
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        {pages.map((page) => {
          if (activePage === page.name) {
            return (
              <div
                className="hover:bg-gray-100 grow rounded-md"
                key={page.name}
              >
                <div className="cursor-pointer py-2">
                  <page.svg fill="#3b82f6" />
                </div>
                <div className="border-b-4 border-blue-500" />
              </div>
            );
          }
          return (
            <div className="hover:bg-gray-100 grow rounded-md" key={page.name}>
              <div className="cursor-pointer py-2">
                <page.svg />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end items-center gap-2">
        <div className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300">
          <img src={menu} alt="menu" className="block m-auto w-6 h-6" />
        </div>
        <div className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300">
          <Messenger fill="black" />
        </div>
        <div className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300">
          <Bell fill="black" />
        </div>
        <div className="w-10 h-10 rounded-full cursor-pointer">
          <img src={pfp} alt="profile" className="block" />
        </div>
      </div>
    </header>
  );
}

export default Header;
