import pfp from '../../assets/pfp.svg';

function ProfileHeader({ fullName }: { fullName: string }) {
  return (
    <header className="flex flex-col relative border-b-2 mb-20">
      <div className="w-full h-36 bg-gray-300" />
      <div className="absolute flex flex-col top-16 pl-2">
        <img
          src={pfp}
          alt="profile"
          className="w-32 h-32 bg-gray-500 rounded-full"
        />
        <p className="font-bold text-2xl">{fullName}</p>
      </div>
    </header>
  );
}

export default ProfileHeader;
