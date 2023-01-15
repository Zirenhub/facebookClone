import facebookLogo from '../../../assets/facebook-logo.svg';
import search from '../../../assets/search.svg';
import menu from '../../../assets/menu-bars.svg';
import home from '../../../assets/home.svg';
import friends from '../../../assets/friend.svg';
import watch from '../../../assets/watch.svg';
import groups from '../../../assets/groups.svg';
import messenger from '../../../assets/messenger.svg';
import bell from '../../../assets/bell.svg';

function Header() {
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
        <div className="grow">
          <img src={home} alt="home" className="block m-auto" />
        </div>
        <div className="grow">
          <img src={friends} alt="friends" className="block m-auto" />
        </div>
        <div className="grow">
          <img src={messenger} alt="messenger" className="block m-auto" />
        </div>
        <div className="grow">
          <img src={watch} alt="watch" className="block m-auto" />
        </div>
        <div className="grow">
          <img src={bell} alt="notifications" className="block m-auto" />
        </div>
        <div className="grow">
          <img src={groups} alt="groups" className="block m-auto" />
        </div>
      </div>
    </header>
  );
}

export default Header;
