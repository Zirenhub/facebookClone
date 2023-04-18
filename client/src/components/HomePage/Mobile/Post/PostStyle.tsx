import { ModifiedPost } from '../../../../types/Post';
import postBackgrounds from './PostBackgrounds';

function PostStyle({ post }: { post: ModifiedPost }) {
  if (post.image) {
    return (
      <div>
        <p>{post.content}</p>
        <img alt="post" src={post.image} />
      </div>
    );
  }
  if (post.background) {
    const background = postBackgrounds.find((b) => b.name === post.background);
    return (
      <div className="relative mt-3">
        <img
          alt={background?.desc}
          src={background?.src}
          className="rounded-md"
        />
        <div className="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 w-full text-center">
          <p className="text-white">{post.content}</p>
        </div>
      </div>
    );
  }
  return <p className="text-xl">{post.content}</p>;
}

export default PostStyle;
