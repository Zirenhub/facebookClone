import HomePageBookmarks from './HomePageBookmarks';
import HomePageGroups from './HomePageGroups';

function HomePage() {
  return (
    <div className="flex p-6 bg-[#f0f2f5] h-full overflow-auto">
      <HomePageBookmarks />
      <div className="grow" />
      <HomePageGroups />
    </div>
  );
}

export default HomePage;
