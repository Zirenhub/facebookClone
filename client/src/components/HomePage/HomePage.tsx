import { useEffect, useState } from 'react';
import MobileHeader from './Mobile/Header';
import MobileWritePost from './Mobile/WritePost';
import MobileAddStory from './Mobile/AddStory';
import DesktopHeader from './Desktop/Header';

function HomePage() {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const isMobile = width <= 500;

  useEffect(() => {
    function handleWindowChange() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowChange);

    return () => {
      window.removeEventListener('resize', handleWindowChange);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="flex flex-col">
        <MobileHeader />
        <MobileWritePost />
        <MobileAddStory />
      </div>
    );
  }

  return (
    <div>
      <DesktopHeader />
    </div>
  );
}

export default HomePage;
