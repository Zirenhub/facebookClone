import { lazy, Suspense, useEffect, useState } from 'react';
import Loading from '../components/Loading';

const MobileHeader = lazy(() => import('../components/HomePage/Mobile/Header'));
const MobileWritePost = lazy(
  () => import('../components/HomePage/Mobile/WritePost')
);
const MobileAddStory = lazy(
  () => import('../components/HomePage/Mobile/AddStory')
);
const DesktopHeader = lazy(
  () => import('../components/HomePage/Desktop/Header')
);

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
        <Suspense fallback={<Loading />}>
          <MobileHeader activePage="home" />
          <MobileWritePost />
          <MobileAddStory />
        </Suspense>
      </div>
    );
  }

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <DesktopHeader activePage="home" />
      </Suspense>
    </div>
  );
}

export default HomePage;
