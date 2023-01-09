import facebookLogo from '../../assets/facebook-logo.svg';

function MobileHeader() {
  return (
    <header className="max-h-24 pb-3 border-b-4 border-slate-400">
      <div className="flex">
        <div className="grow flex justify-start">
          <img
            className="object-cover h-[42px] w-[146px]"
            alt="facebook logo"
            src={facebookLogo}
          />
        </div>
        <div className="flex gap-5 p-2">
          <div className="w-[30px] h-[30px] bg-gray-300" />
          <div className="w-[30px] h-[30px] bg-gray-300" />
        </div>
      </div>
      <div className="flex justify-between px-5">
        <div className="w-[30px] h-[30px] bg-gray-300" />
        <div className="w-[30px] h-[30px] bg-gray-300" />
        <div className="w-[30px] h-[30px] bg-gray-300" />
        <div className="w-[30px] h-[30px] bg-gray-300" />
        <div className="w-[30px] h-[30px] bg-gray-300" />
        <div className="w-[30px] h-[30px] bg-gray-300" />
      </div>
    </header>
  );
}

export default MobileHeader;
