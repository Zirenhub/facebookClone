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
    .sort((a, b) => b[1] - a[1])
    .filter((r) => {
      if (r[1] > 0) {
        return true;
      }
      return false;
    })
    .map((r) => r[0]);

  return (
    <div className="flex items-center h-8">
      <div className="flex relative">
        {sortedReactions.map((r, i) => {
          return (
            <div
              className={`absolute top-0 ${
                i > 0 ? `left-${sortedReactions.length - i}0` : ''
              }  z-${sortedReactions.length - i}0`}
              key={r}
            >
              {r === 'like' && <img alt="like gif" src={LikeGif} />}
              {r === 'laugh' && <img alt="laugh gif" src={LaughGif} />}
              {r === 'heart' && <img alt="heart gif" src={HeartGif} />}
            </div>
          );
        })}
      </div>
      <p>{reactionsDetail.reactionsNum}</p>
    </div>
  );
}

export default PostFooterReactions;
