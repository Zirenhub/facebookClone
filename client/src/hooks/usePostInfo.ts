import { useEffect, useState } from 'react';
import { Reactions, ReactionsDetails, ReactionTypes } from '../types/Post';

function usePostInfo(postReactions: Reactions) {
  const [reactionsDetail, setReactionsDetail] = useState<ReactionsDetails>({
    reactionsInfo: { like: 0, heart: 0, laugh: 0 },
    reactionsNum: 0,
    commentsNum: 0,
  });

  function increaseDecreaseReactions(r: ReactionTypes, operation: '+' | '-') {
    setReactionsDetail({
      ...reactionsDetail,
      reactionsInfo: {
        ...reactionsDetail.reactionsInfo,
        [r]:
          operation === '+'
            ? (reactionsDetail.reactionsInfo[r] += 1)
            : (reactionsDetail.reactionsInfo[r] -= 1),
      },
    });
  }
  useEffect(() => {
    const laughs = postReactions.filter((r) => r.type === 'laugh');
    const likes = postReactions.filter((r) => r.type === 'like');
    const hearts = postReactions.filter((r) => r.type === 'heart');

    setReactionsDetail({
      reactionsInfo: {
        laugh: laughs.length,
        heart: hearts.length,
        like: likes.length,
      },
      reactionsNum: laughs.length + hearts.length + likes.length,
      commentsNum: 0,
    });
  }, [postReactions]);

  return { increaseDecreaseReactions, reactionsDetail };
}

export default usePostInfo;
