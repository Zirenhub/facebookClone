import { lazy, Suspense } from 'react';
import Loading from '../../components/Loading';

const MobileWritePost = lazy(
  () => import('../../components/HomePage/Mobile/WritePost')
);
const MobileAddStory = lazy(
  () => import('../../components/HomePage/Mobile/AddStory')
);

function HomePage() {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<Loading />}>
        <MobileWritePost />
        <MobileAddStory />
      </Suspense>
    </div>
  );
}

export default HomePage;
