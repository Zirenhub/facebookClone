import { ReactionsDetails } from '../../../../types/Post';
import LaughGif from '../../../../assets/laughing-reaction.gif';
import HeartGif from '../../../../assets/heart-reaction.gif';
import LikeGif from '../../../../assets/like-reaction.gif';

function PostFooterReactions({
  reactionsDetail,
}: {
  reactionsDetail: ReactionsDetails;
}) {
  const onlyReactions = {
    like: reactionsDetail.like,
    laugh: reactionsDetail.laugh,
    heart: reactionsDetail.heart,
  };

  const sortedReactions = Object.entries(onlyReactions)
    .filter((r) => {
      if (r[1] > 0) {
        return true;
      }
      return false;
    })
    .sort((a, b) => b[1] - a[1])
    .map((r) => r[0]);

  function getReactionsWidth() {
    let elClass = '';
    if (sortedReactions.length) {
      elClass = `${32 + sortedReactions.length * 5.0}px`;
    }

    return elClass;
  }

  return (
    <div className="flex items-center py-1 relative">
      {sortedReactions.map((r, i) => {
        let left = `0px`;
        if (i > 0) {
          left = `${sortedReactions.length - i}0px`;
        }
        return (
          <div
            className="absolute h-8 w-8"
            style={{
              left,
              zIndex: sortedReactions.length - i,
            }}
            key={r}
          >
            {r === 'like' && <img alt="like gif" src={LikeGif} />}
            {r === 'laugh' && <img alt="laugh gif" src={LaughGif} />}
            {r === 'heart' && <img alt="heart gif" src={HeartGif} />}
          </div>
        );
      })}
      <div style={{ marginLeft: getReactionsWidth() }}>
        {reactionsDetail.reactionsNum > 0 && (
          <p>{reactionsDetail.reactionsNum}</p>
        )}
      </div>
    </div>
  );
}

export default PostFooterReactions;
