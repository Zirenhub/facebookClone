import HomePageBookmarks from './HomePageBookmarks';
import HomePageGroups from './HomePageGroups';
import HomePageMain from './HomePageMain';

function HomePage() {
  return (
    <div className="flex p-6 bg-[#f0f2f5] h-full overflow-auto">
      <HomePageBookmarks />
      <HomePageMain />
      <HomePageGroups />
    </div>
  );
}

export default HomePage;
