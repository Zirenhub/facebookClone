import TextareaAutosize from 'react-textarea-autosize';
import { useState } from 'react';
import { TPost, TPostBackgrounds } from '../../types/Post';
import postBackgrounds from './PostBackgrounds';
import useAuthContext from '../../hooks/useAuthContext';
import backgroundsImg from '../../assets/post-backgrounds.png';

type Props = {
  post: TPost;
  handlePostBackground: (bg: TPostBackgrounds) => void;
  handlePostContent: (e: React.SyntheticEvent<Element, Event>) => void;
};

function DefaultPost({ post, handlePostBackground, handlePostContent }: Props) {
  const [viewBackgrounds, setViewBackgrounds] = useState<boolean>(false);

  const auth = useAuthContext();

  function getPostBackground() {
    const background = postBackgrounds.find((b) => b.name === post.background);
    if (background) {
      return (
        <>
          <img
            src={background.src}
            alt={background.desc}
            className="rounded-md"
          />
          <TextareaAutosize
            className="bg-transparent absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white text-center w-full px-10 font-bold outline-none resize-none"
            placeholder="What's on your mind?"
            maxLength={post.maxLength}
            value={post.content}
            onChange={handlePostContent}
          />
        </>
      );
    }
    return null;
  }

  function getPostBackgrounds() {
    return (
      <>
        <button
          type="button"
          aria-label="blank background"
          className="bg-gray-100 h-auto w-11 rounded-md"
          onClick={() => handlePostBackground(null)}
        />
        {postBackgrounds.map((b) => {
          return (
            <button
              type="button"
              key={b.desc}
              onClick={() => handlePostBackground(b.name)}
            >
              <img
                alt={b.desc}
                src={b.src}
                className="rounded-md h-auto w-11 object-cover"
              />
            </button>
          );
        })}
      </>
    );
  }

  return (
    <div className="relative">
      {post.background ? (
        getPostBackground()
      ) : (
        <TextareaAutosize
          className="min-h-[200px] w-full text-xl p-1 resize-none"
          maxLength={post.maxLength}
          value={post.content}
          maxRows={10}
          onChange={handlePostContent}
          placeholder={`What's on your mind, ${auth.user?.firstName}?`}
        />
      )}
      <div className="flex absolute bottom-1 left-1 gap-3">
        <button
          type="button"
          className={`${
            viewBackgrounds ? 'h-auto w-11 bg-gray-100 rounded-md' : ''
          }`}
          onClick={() => setViewBackgrounds(!viewBackgrounds)}
        >
          {viewBackgrounds ? (
            'X'
          ) : (
            <img
              alt="post backgrounds"
              src={backgroundsImg}
              className="rounded-md h-auto w-11"
            />
          )}
        </button>
        {viewBackgrounds && getPostBackgrounds()}
      </div>
    </div>
  );
}

export default DefaultPost;
