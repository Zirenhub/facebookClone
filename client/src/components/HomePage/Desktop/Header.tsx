import fLogo from '../../../assets/f-logo.svg';
import home from '../../../assets/home.svg';
import friends from '../../../assets/friend.svg';
import watch from '../../../assets/watch.svg';
import marketplace from '../../../assets/marketplace.svg';
import groups from '../../../assets/groups.svg';
import messenger from '../../../assets/messenger.svg';
import bell from '../../../assets/bell.svg';
import menu from '../../../assets/menu.svg';
import pfp from '../../../assets/pfp.svg';

interface Props {
  activePage: string;
}

function Header({ activePage }: Props) {
  return (
    <header className="grid grid-cols-3 bg-white px-3 shadow-md">
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
        <div className="hover:bg-gray-100 grow rounded-md">
          <div className="cursor-pointer py-2">
            <img src={home} alt="home" className="block m-auto" />
          </div>
          {activePage === 'home' && (
            <div className="border-b-4 border-blue-500" />
          )}
        </div>
        <div className="hover:bg-gray-100 grow rounded-md">
          <div className="cursor-pointer py-2">
            <img src={friends} alt="friends" className="block m-auto" />
          </div>
          {activePage === 'friends' && (
            <div className="border-b-4 border-blue-500" />
          )}
        </div>
        <div className="hover:bg-gray-100 grow rounded-md">
          <div className="cursor-pointer py-2">
            <img src={watch} alt="watch" className="block m-auto" />
          </div>
          {activePage === 'watch' && (
            <div className="border-b-4 border-blue-500" />
          )}
        </div>
        <div className="hover:bg-gray-100 grow rounded-md">
          <div className="cursor-pointer py-2 ">
            <img src={marketplace} alt="marketplace" className="block m-auto" />
          </div>
          {activePage === 'marketplace' && (
            <div className="border-b-4 border-blue-500" />
          )}
        </div>
        <div className="hover:bg-gray-100 grow rounded-md">
          <div className="cursor-pointer py-2">
            <img src={groups} alt="groups" className="block m-auto" />
          </div>
          {activePage === 'groups' && (
            <div className="border-b-4 border-blue-500" />
          )}
        </div>
      </div>
      <div className="flex justify-end items-center gap-2">
        <div className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300">
          <img src={menu} alt="menu" className="block m-auto w-6 h-6" />
        </div>
        <div className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300">
          <img
            src={messenger}
            alt="messenger"
            className="block m-auto w-6 h-6"
          />
        </div>
        <div className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300">
          <img
            src={bell}
            alt="notifications"
            className="block m-auto w-6 h-6"
          />
        </div>
        <div className="w-10 h-10 rounded-full cursor-pointer">
          <img src={pfp} alt="profile" className="block" />
        </div>
      </div>
    </header>
  );
}

export default Header;
