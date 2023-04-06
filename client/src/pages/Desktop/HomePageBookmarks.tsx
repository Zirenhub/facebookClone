import { useState } from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import Pfp from '../../assets/pfp-two.svg';
import useBookmarks from '../../hooks/useBookmars';

function HomePageBookmarks() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const auth = useAuthContext();
  const { homepageBookmarks } = useBookmarks();

  type ButtonProps = {
    text: string;
    onClick?: () => void;
  };

  function button({ text, onClick }: ButtonProps) {
    return (
      <div className="flex items-center">
        <button
          type="button"
          onClick={onClick}
          className="p-3 w-full rounded-lg text-start text-lg hover:bg-gray-200 transition-all"
        >
          {text}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-y-scroll pr-3 w-[280px]">
      {button({ text: auth.user?.fullName || '' })}
      <ul>
        {homepageBookmarks
          .slice(0, expanded ? homepageBookmarks.length : 11)
          .map((s) => {
            return <li key={s._id}>{button({ text: s.section })}</li>;
          })}
      </ul>
      <div>
        {button({
          text: expanded ? 'See less' : 'See more',
          onClick: () => setExpanded(!expanded),
        })}
      </div>
    </div>
  );
}
export default HomePageBookmarks;
