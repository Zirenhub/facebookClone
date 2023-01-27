import { lazy, Suspense } from 'react';
import Loading from '../../components/Loading';

const DesktopHeader = lazy(
  () => import('../../components/HomePage/Desktop/Header')
);

function HomePage() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <DesktopHeader activePage="home" />
      </Suspense>
    </div>
  );
}

export default HomePage;
