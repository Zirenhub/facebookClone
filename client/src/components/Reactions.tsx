import { useEffect } from 'react';
import LaughingReaction from '../assets/laughing-reaction.gif';
import HeartReaction from '../assets/heart-reaction.gif';
import LikeReaction from '../assets/like-reaction.gif';

function Reactions({
  close,
  setReaction,
}: {
  close: () => void;
  setReaction: React.Dispatch<
    React.SetStateAction<'laugh' | 'heart' | 'like' | null>
  >;
}) {
  useEffect(() => {
    const mainEl = document.querySelector('main');
    mainEl?.addEventListener('click', close);
  }, [close]);

  return (
    <div className="bg-white rounded-md flex absolute -top-12 left-10">
      <button type="button" onTouchStart={() => setReaction('laugh')}>
        <img
          src={LaughingReaction}
          alt="laughing reaction"
          className="bg-contain h-12 w-12 "
        />
      </button>
      <button type="button" onTouchStart={() => setReaction('heart')}>
        <img
          src={HeartReaction}
          alt="heart reaction"
          className="h-12 w-12 bg-contain"
        />
      </button>
      <button type="button" onTouchStart={() => setReaction('like')}>
        <img
          src={LikeReaction}
          alt="like reaction"
          className="h-12 w-12 bg-contain"
        />
      </button>
    </div>
  );
}

export default Reactions;
