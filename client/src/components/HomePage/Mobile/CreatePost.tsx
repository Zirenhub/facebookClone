import React, { useState } from 'react';
import useAuthContext from '../../../hooks/useAuthContext';
import Pfp from '../../../assets/pfp-two.svg';
import Back from '../../../assets/back.svg';
import postBgOne from '../../../assets/post-bg-one.jpg';
import postBgTwo from '../../../assets/post-bg-two.jpg';
import postBgThree from '../../../assets/post-bg-three.jpg';
import postBgFour from '../../../assets/post-bg-four.jpg';

function CreatePost({ close }: { close: () => void }) {
  const [postContent, setPostContent] = useState<{
    content: string;
    audience: string;
    background: string | null;
  }>({ content: '', audience: 'friends', background: null });

  const auth = useAuthContext();
  const postBackgrounds = [
    { desc: 'vinyl player background', src: postBgOne, name: 'post-bg-one' },
    { desc: 'animal eyes background', src: postBgTwo, name: 'post-bg-two' },
    { desc: 'rain drops background', src: postBgThree, name: 'post-bg-three' },
    {
      desc: 'laughing emojis background',
      src: postBgFour,
      name: 'post-bg-four',
    },
  ];

  function getBackground() {
    if (postContent.background) {
      return `bg-[url('src/assets/${postContent.background}.jpg')]`;
    }
    return '';
  }

  function handlePostContent(e: React.SyntheticEvent) {
    const target = e.target as HTMLTextAreaElement;
    setPostContent({ ...postContent, content: target.value });
  }

  function handlePostAudience(e: React.SyntheticEvent) {
    const target = e.target as HTMLSelectElement;
    setPostContent({ ...postContent, audience: target.value });
  }

  function handlePostBackground(bg: string | null) {
    setPostContent({ ...postContent, background: bg });
  }

  function handleSubmit() {
    if (postContent.content && postContent.audience) {
      // todo
    }
  }

  return (
    <div className="z-10 absolute bg-white top-0 left-0 h-full w-full">
      <header className="flex justify-between p-3 border-b-2">
        <div className="flex gap-2 items-center">
          <button type="button" onClick={close}>
            <Back />
          </button>
          <p className="font-bold">Create post</p>
        </div>
        <div>
          <button
            type="button"
            className={`${
              postContent.content
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-500'
            } font-bold rounded-sm px-2 py-1`}
          >
            POST
          </button>
        </div>
      </header>
      <div className="flex flex-col">
        <div className="flex gap-2 p-3">
          <div className="h-12 w-12">
            <Pfp height="100%" width="100%" />
          </div>
          <div className="flex flex-col">
            <p>{auth.user?.fullName}</p>
            <select
              value={postContent.audience}
              onChange={handlePostAudience}
              className="bg-white font-bold"
            >
              <option value="public">Public</option>
              <option value="friends">Friends</option>
            </select>
          </div>
        </div>
        <div className={`p-2 ${getBackground()}`}>
          <textarea
            className="w-full min-h-[50px] h-24 max-h-28 bg-transparent"
            placeholder="What's on your mind?"
            onChange={handlePostContent}
          />
        </div>
      </div>
      <div className="flex w-full h-12 justify-between">
        <button
          type="button"
          className="px-1"
          onClick={() => handlePostBackground(null)}
        >
          <div className="bg-gray-200 rounded-md h-full w-[75px] block m-auto" />
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
                className="rounded-md h-full block m-auto"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CreatePost;
