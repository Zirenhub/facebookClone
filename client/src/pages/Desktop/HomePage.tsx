import { useState } from 'react';
import GroupChat from '../../components/Groups/GroupChat';
import useGroups from '../../hooks/useGroups';
import HomePageBookmarks from './HomePageBookmarks';
import HomePageGroups from './HomePageGroups';
import HomePageMain from './HomePageMain';
import MenuSVG from '../../assets/menu-bars.svg';
import GroupsSVG from '../../assets/groups.svg';

function HomePage() {
  const [bookmarksIsOpen, setBookmarksIsOpen] = useState<boolean>(false);
  const [groupsIsOpen, setGroupsIsOpen] = useState<boolean>(false);
  const { groups, setOpenGroup, openGroup, isLoading, isError, error } =
    useGroups();
  const isSmallScreen = window.innerWidth <= 1415;

  return (
    <div className="flex gap-3 px-6 bg-gray-100 h-full relative">
      <div className={`py-4 ${isSmallScreen ? '' : 'overflow-scroll'}`}>
        {isSmallScreen ? (
          <button
            type="button"
            className="h-9 w-9 bg-white rounded-lg p-1"
            onClick={() => setBookmarksIsOpen(!bookmarksIsOpen)}
          >
            <MenuSVG height="100%" width="100%" />
          </button>
        ) : (
          <HomePageBookmarks />
        )}
      </div>
      {bookmarksIsOpen && isSmallScreen && (
        <div className="absolute overflow-scroll bg-white flex flex-col left-0 top-0 bg-whtite shadow-md border-r-2 z-20 h-full">
          <button
            type="button"
            onClick={() => setBookmarksIsOpen(false)}
            className="w-fit px-5 pt-4 text-lg ml-auto"
          >
            &#10006;
          </button>
          <HomePageBookmarks />
        </div>
      )}
      <div className="flex-1 flex justify-center">
        {openGroup ? (
          <div className="mt-1 grow">
            <GroupChat group={openGroup} close={() => setOpenGroup(null)} />
          </div>
        ) : (
          <HomePageMain />
        )}
      </div>
      <div className={`py-4 ${isSmallScreen ? '' : 'overflow-scroll'}`}>
        {isSmallScreen ? (
          <button
            type="button"
            className="h-9 w-9 bg-white rounded-lg p-1"
            onClick={() => setGroupsIsOpen(true)}
          >
            <GroupsSVG height="100%" width="100%" />
          </button>
        ) : (
          <HomePageGroups groups={groups} setOpenGroup={setOpenGroup} />
        )}
      </div>
      {groupsIsOpen && isSmallScreen && (
        <div className="absolute overflow-scroll flex flex-col right-0 top-0 bg-white px-5 shadow-md border-l-2 z-20 h-full">
          <button
            type="button"
            onClick={() => setGroupsIsOpen(false)}
            className="w-fit pt-4 text-lg mr-auto"
          >
            &#10006;
          </button>
          <HomePageGroups groups={groups} setOpenGroup={setOpenGroup} />
        </div>
      )}
    </div>
  );
}

export default HomePage;
