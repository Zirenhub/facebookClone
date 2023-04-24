import GroupChat from '../../components/Groups/GroupChat';
import useGroups from '../../hooks/useGroups';
import HomePageBookmarks from './HomePageBookmarks';
import HomePageGroups from './HomePageGroups';
import HomePageMain from './HomePageMain';

function HomePage() {
  const { groups, setOpenGroup, openGroup, isLoading, isError, error } =
    useGroups();

  return (
    <div className="flex p-6 bg-[#f0f2f5] h-full overflow-auto">
      <HomePageBookmarks />
      <div className="px-36 flex-1">
        {openGroup ? (
          <GroupChat group={openGroup} close={() => setOpenGroup(null)} />
        ) : (
          <HomePageMain />
        )}
      </div>
      <HomePageGroups groups={groups} setOpenGroup={setOpenGroup} />
    </div>
  );
}

export default HomePage;
