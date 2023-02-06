import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { TDefaultPost } from '../../../../types/Post';
import postBgOne from '../../../../../public/assets/post-bg-one.jpg';
import postBgTwo from '../../../../../public/assets/post-bg-two.jpg';
import postBgThree from '../../../../../public/assets/post-bg-three.jpg';
import postBgFour from '../../../../../public/assets/post-bg-four.jpg';

type Props = {
  setCanSend: React.Dispatch<React.SetStateAction<boolean>>;
};

function DefaultPost({ setCanSend }: Props) {
  const [postContent, setPostContent] = useState<TDefaultPost>({
    content: '',
    background: null,
  });

  const postBackgrounds = [
    { desc: 'vinyl player background', name: 'post-bg-one', src: postBgOne },
    { desc: 'animal eyes background', name: 'post-bg-two', src: postBgTwo },
    { desc: 'rain drops background', name: 'post-bg-three', src: postBgThree },
    {
      desc: 'laughing emojis background',
      name: 'post-bg-four',
      src: postBgFour,
    },
  ];

  function getPostBackground() {
    // `bg-[url('/assets/${postContent.background}.jpg')]` doesn't work for some reason
    const bgClass = 'flex justify-center items-center';
    switch (postContent.background) {
      case 'post-bg-one':
        return `bg-[url('/assets/post-bg-one.jpg')] ${bgClass} text-white`;
      case 'post-bg-two':
        return `bg-[url('/assets/post-bg-two.jpg')] ${bgClass} text-white`;
      case 'post-bg-three':
        return `bg-[url('/assets/post-bg-three.jpg')] ${bgClass} text-white`;
      case 'post-bg-four':
        return `bg-[url('/assets/post-bg-four.jpg')] ${bgClass} text-black`;
      default:
        return '';
    }
  }

  function handlePostBackground(bg: string | null) {
    if (postContent.content.length <= 250) {
      setPostContent({ ...postContent, background: bg });
    }
  }

  function handlePostContent(e: React.SyntheticEvent) {
    const target = e.target as HTMLTextAreaElement;
    const content = target.value.trim();
    if (content) {
      setCanSend(true);
    } else {
      setCanSend(false);
    }
    if (content.length > 250) {
      setPostContent({
        ...postContent,
        content,
        background: null,
      });
    } else {
      setPostContent({ ...postContent, content });
    }
  }

  function handleSubmit() {
    if (postContent.content) {
      // todo
    }
  }

  return (
    <>
      <div
        className={`${getPostBackground()} bg-contain bg-center bg-no-repeat h-72`}
      >
        <TextareaAutosize
          className={`bg-transparent font-bold outline-none resize-none ${
            postContent.background ? 'text-center' : 'w-full'
          }`}
          placeholder="What's on your mind?"
          maxLength={450}
          onChange={(e) => handlePostContent(e)}
        />
      </div>
      <div className="flex w-full gap-2">
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
