import TextareaAutosize from 'react-textarea-autosize';
import { TPost } from '../../../../types/Post';
import postBackgrounds from '../Post/PostBackgrounds';

type Props = {
  post: TPost;
  setPost: React.Dispatch<React.SetStateAction<TPost>>;
};

function DefaultPost({ post, setPost }: Props) {
  function handlePostBackground(
    bg: 'post-bg-one' | 'post-bg-two' | 'post-bg-three' | 'post-bg-four' | null
  ) {
    if (post.content.length <= 250) {
      setPost({ ...post, background: bg });
    }
  }

  function handlePostContent(e: React.SyntheticEvent) {
    const target = e.target as HTMLTextAreaElement;
    const content = target.value;
    if (content.length > 250) {
      setPost({
        ...post,
        content,
        background: null,
      });
    } else {
      setPost({ ...post, content });
    }
  }

  function getPostBackground() {
    const background = postBackgrounds.find((b) => b.name === post.background);
    if (background) {
      return (
        <div className="relative">
          <img
            src={background.src}
            alt={background.desc}
            className="rounded-md"
          />
          <TextareaAutosize
            className="bg-transparent absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white text-center w-full px-10 font-bold outline-none resize-none"
            placeholder="What's on your mind?"
            maxLength={450}
            value={post.content}
            onChange={(e) => handlePostContent(e)}
          />
        </div>
      );
    }
    return null;
  }

  return (
    <>
      {post.background ? (
        getPostBackground()
      ) : (
        <TextareaAutosize
          className="w-full font-bold outline-none resize-none min-h-[200px]"
          placeholder="What's on your mind?"
          maxLength={450}
          value={post.content}
          onChange={(e) => handlePostContent(e)}
          autoFocus
        />
      )}
      <div className="flex w-full gap-2 mt-4">
        <button type="button" onClick={() => handlePostBackground(null)}>
          <div className="bg-gray-200 rounded-md h-12 w-16" />
        </button>
        {postBackgrounds.map((postBg) => {
          return (
            <button
              type="button"
              key={postBg.desc}
              onClick={() => handlePostBackground(postBg.name)}
            >
              <img
                alt={postBg.desc}
                src={postBg.src}
                className="rounded-md block m-auto"
              />
            </button>
          );
        })}
      </div>
    </>
  );
}

export default DefaultPost;
