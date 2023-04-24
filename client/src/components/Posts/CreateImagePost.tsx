import TextareaAutosize from 'react-textarea-autosize';
import { useRef } from 'react';
import { TPost } from '../../types/Post';

type Props = {
  post: TPost;
  handlePostContent: (e: React.SyntheticEvent<Element, Event>) => void;
  handleImageChange: (e: React.SyntheticEvent<Element, Event>) => void;
  handleRemoveImage: () => void;
};

function ImagePost({
  post,
  handlePostContent,
  handleImageChange,
  handleRemoveImage,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <TextareaAutosize
        className="outline-none text-lg resize-none placeholder:text-dimGray w-full"
        placeholder="Say something about this image."
        maxLength={post.maxLength}
        value={post.content}
        onChange={(e) => handlePostContent(e)}
      />
      {!post.image && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full bg-gray-100 rounded-md py-5 mt-10 border-2 hover:bg-gray-200 transition-all"
        >
          Choose Image
        </button>
      )}
      {post.image && (
        <div className="w-full flex justify-center items-center mt-5 relative">
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-white rounded-full px-1"
          >
            <span className="text-dimBlack">&#10006;</span>
          </button>
          <img
            alt="your file"
            src={URL.createObjectURL(post.image)}
            className="max-h-64 rounded-lg"
          />
        </div>
      )}
      <form className="pt-2" encType="multipart/form-data">
        <input
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          name="post-image"
          style={{ display: 'none' }}
        />
      </form>
    </div>
  );
}

export default ImagePost;
