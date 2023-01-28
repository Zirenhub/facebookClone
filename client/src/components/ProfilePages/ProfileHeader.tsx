import Pfp from '../../assets/pfp-two.svg';

function ProfileHeader({ fullName }: { fullName: string }) {
  return (
    <header className="flex flex-col relative border-b-2 mb-20">
      <div className="w-full h-36 bg-gray-300" />
      <div className="absolute flex flex-col top-16 pl-2">
        <div className="w-32 h-32 bg-gray-300 rounded-full border-4">
          <Pfp height="100%" width="100%" />
        </div>
        <p className="font-bold text-2xl">{fullName}</p>
      </div>
    </header>
  );
}

export default ProfileHeader;
