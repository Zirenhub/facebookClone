import Search from '../../assets/search.svg';
import CogWheel from '../../assets/cog-wheel.svg';

function MobileMenu() {
  return (
    <div className="bg-gray-100 p-3">
      <header className="flex flex-col">
        <div className="flex justify-between">
          <p className="font-bold text-3xl">Menu</p>
          <div>
            <button type="button" className="rounded-full p-2 bg-gray-200">
              <CogWheel />
            </button>
            <button type="button" className="rounded-full p-2 bg-gray-200">
              <Search />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default MobileMenu;
