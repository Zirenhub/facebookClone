import pfp from '../../assets/pfp.svg';

function MobileWritePost() {
  return (
    <div className="flex justify-between items-center px-2 py-4">
      <div>
        <img src={pfp} alt="profile" className="max-w-[48px]" />
      </div>
      <form>
        <label>
          <input
            type="text"
            name="content"
            placeholder="What's on your mind?"
            className="rounded-full px-4 py-2 max-w-[240px] bg-gray-200 text-black"
          />
        </label>
      </form>
      <div className="flex flex-col items-center">
        <div className="w-[30px] h-[30px] bg-gray-300" />
        <p className="text-sm">Photo</p>
      </div>
    </div>
  );
}

export default MobileWritePost;
