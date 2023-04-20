import { useState } from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import Pfp from '../../assets/pfp-two.svg';
import useBookmarks from '../../hooks/useBookmars';

function HomePageBookmarks() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const auth = useAuthContext();
  const { homepageBookmarks } = useBookmarks();

  const liClass =
    'p-3 w-full rounded-lg hover:bg-gray-200 transition-all flex gap-3 items-center';

  return (
    <ul className="flex flex-col overflow-y-scroll pr-3 w-[280px] text-dimBlack">
      <li className={liClass}>
        <Pfp height="34px" width="34px" />
        <button type="button">{auth.user?.fullName}</button>
      </li>
      {homepageBookmarks
        .slice(0, expanded ? homepageBookmarks.length : 11)
        .map((s) => {
          return (
            <li key={s._id} className={liClass}>
              <s.svg height="34px" width="34px" />
              <button type="button" className="text-start text-lg">
                {s.section}
              </button>
            </li>
          );
        })}
      <li className={liClass}>
        <button type="button" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'See less' : 'See more'}
        </button>
      </li>
    </ul>
  );
}
export default HomePageBookmarks;
