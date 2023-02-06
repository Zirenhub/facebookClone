import React, { useState } from 'react';
import useAuthContext from '../../../hooks/useAuthContext';
import Pfp from '../../../assets/pfp-two.svg';
import Back from '../../../assets/back.svg';
import Close from '../../../assets/x.svg';
import DefaultPost from './PostTypes/DefaultPost';
import ImagePost from './PostTypes/ImagePost';

function CreatePost({ close }: { close: () => void }) {
  const [postType, setPostType] = useState<string>('default');
  const [postAudience, setPostAudience] = useState<string>('friends');
  const [canSendPost, setCanSendPost] = useState<boolean>(false);

  const auth = useAuthContext();

  function handlePostAudience(e: React.SyntheticEvent) {
    const target = e.target as HTMLSelectElement;
    setPostAudience(target.value);
  }

  return (
    <div className="z-10 absolute bg-white top-0 left-0 h-full w-full">
      <header className="flex justify-between p-3 border-b-2">
        <div className="flex gap-2 items-center">
          {postType === 'image' ? (
            <button type="button" onClick={() => setPostType('default')}>
              <Back />
            </button>
          ) : (
            <button type="button" onClick={close}>
              <Close />
            </button>
          )}
          <p className="font-bold">Create post</p>
        </div>
        <div>
          <button
            type="button"
            className={`${
              canSendPost
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-500'
            } font-bold rounded-sm px-2 py-1`}
          >
            POST
          </button>
        </div>
      </header>
      <div className="flex gap-2 p-2">
        <div className="h-12 w-12">
          <Pfp height="100%" width="100%" />
        </div>
        <div className="flex flex-col">
          <p>{auth.user?.fullName}</p>
          <select
            value={postAudience}
            onChange={handlePostAudience}
            className="bg-white font-bold"
          >
            <option value="public">Public</option>
            <option value="friends">Friends</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col p-2">
        {postType === 'default' && (
          <>
            <DefaultPost setCanSend={setCanSendPost} />
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setPostType('image')}
                className="bg-gray-200 rounded-md px-2 py-1"
              >
                Add image
              </button>
            </div>
          </>
        )}
        {postType === 'image' && <ImagePost />}
      </div>
    </div>
  );
}

export default CreatePost;
