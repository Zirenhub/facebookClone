import { useEffect, useState } from 'react';
import MobileHeader from './MobileHeader';
import MobileWritePost from './MobileWritePost';

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
      </div>
    );
  }
  return <p>Hello desktop user</p>;
}

export default HomePage;
