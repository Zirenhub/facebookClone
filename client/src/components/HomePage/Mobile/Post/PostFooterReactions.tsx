import { ReactionsDetails, ReactionTypes } from '../../../../types/Post';

function PostFooterReactions({
  reactionsDetail,
}: {
  reactionsDetail: ReactionsDetails;
}) {
  const { heart, laugh, like } = reactionsDetail.reactionsInfo;

  function getReaction(r: ReactionTypes) {
    let emoji;
    if (r === 'heart') {
      emoji = '❤️';
    } else if (r === 'laugh') {
      emoji = '😂';
    } else {
      emoji = '👍';
    }

    return (
      <div className="flex items-center">
        <p>{emoji}</p>
        <p>{reactionsDetail.reactionsNum}</p>
      </div>
    );
  }

  if (heart > like + laugh) {
    return getReaction('heart');
  }

  if (laugh > heart + like) {
    return getReaction('laugh');
  }

  return getReaction('like');
}

export default PostFooterReactions;
