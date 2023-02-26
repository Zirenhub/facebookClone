import { TDBPost } from '../types/Post';

function createPostReactionsDetails(post: TDBPost, userID?: string) {
  const laughs = post.reactions.filter((r) => r.type === 'laugh');
  const likes = post.reactions.filter((r) => r.type === 'like');
  const hearts = post.reactions.filter((r) => r.type === 'heart');
  const myReaction = post.reactions.find((r) => r.author === userID);

  return {
    ...post,
    reactionsDetails: {
      laugh: laughs.length,
      heart: hearts.length,
      like: likes.length,
      reactionsNum: laughs.length + hearts.length + likes.length,
      commentsNum: 0,
      myReaction: myReaction ? myReaction.type : null,
    },
  };
}

export default createPostReactionsDetails;
