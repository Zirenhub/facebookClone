import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { TImagePost } from '../../../../types/Post';

function ImagePost() {
  const [postContent, setPostContent] = useState<TImagePost>({
    content: '',
    image: null,
  });

  function handlePostContent(e: React.SyntheticEvent) {
    const target = e.target as HTMLTextAreaElement;
    const content = target.value.trim();
    setPostContent({ ...postContent, content });
  }

  function handleImageChange(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      setPostContent({ ...postContent, image: target.files[0] });
    }
  }

  return (
    <>
      <TextareaAutosize
        className="font-bold outline-none resize-none placeholder:text-gray-600 w-full"
        placeholder="Say something about this image."
        maxLength={450}
        onChange={(e) => handlePostContent(e)}
      />
      <div className="w-full flex justify-center items-center bg-gray-200">
        {postContent.image ? (
          <img
            alt="your file"
            src={URL.createObjectURL(postContent.image)}
            className="max-h-64"
          />
        ) : (
          <p>Please select an image.</p>
        )}
      </div>
      <form className="pt-2">
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/png, image/jpeg"
        />
      </form>
    </>
  );
}

export default ImagePost;
