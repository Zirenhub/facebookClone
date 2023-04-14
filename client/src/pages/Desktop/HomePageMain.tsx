import { useState } from 'react';

type PagesT = 'stories' | 'reels';

function HomePageMain() {
  const [currentPage, setCurrentPage] = useState<PagesT>('stories');

  function storiesButton(text: PagesT) {
    return (
      <div className="flex flex-col grow hover:bg-gray-200 rounded-lg transition-all">
        <button
          type="button"
          className={`${
            currentPage === text ? 'text-blue-500' : 'text-gray-500'
          }  font-bold px-8 py-4`}
          onClick={() => setCurrentPage(text)}
        >
          {text.charAt(0).toUpperCase() + text.slice(1)}
        </button>
        {currentPage === text && <div className="h-1 bg-blue-500" />}
      </div>
    );
  }

  return (
    <div className="flex-1 px-36">
      <div className="bg-white shadow-md flex flex-col rounded-lg">
        <div className="flex m-2">
          {storiesButton('stories')}
          {storiesButton('reels')}
        </div>

        {/* create story shit */}
        <div />
      </div>
    </div>
  );
}

export default HomePageMain;
