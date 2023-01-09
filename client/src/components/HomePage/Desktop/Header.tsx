import fLogo from '../../../assets/f-logo.svg';
import home from '../../../assets/home.svg';
import friends from '../../../assets/friend.svg';
import groups from '../../../assets/groups.svg';

function Header() {
  return (
    <header className="grid grid-cols-3 bg-white p-3 shadow-md">
      <div className="flex gap-5">
        <div className="shrink-0">
          <img src={fLogo} alt="facebook logo" className="min-h-[40px]" />
        </div>
        <div>
          <input
            placeholder="Search Facebook"
            className="p-2 bg-gray-100 rounded-full"
          />
        </div>
      </div>
      <div className="flex justify-center gap-20">
        <div className="w-[40px]">
          <img src={home} alt="home" />
        </div>
        <div className="w-[40px]">
          <img src={friends} alt="friends" />
        </div>
        <div className="w-[40px]">
          <img src={groups} alt="groups" />
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-gray-200 rounded-full">
          <p className="text-2xl px-3">+</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
