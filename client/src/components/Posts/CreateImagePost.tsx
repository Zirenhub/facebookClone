import TextareaAutosize from 'react-textarea-autosize';
import { TPost } from '../../types/Post';

type Props = {
  post: TPost;
  handlePostContent: (e: React.SyntheticEvent<Element, Event>) => void;
  handleImageChange: (e: React.SyntheticEvent<Element, Event>) => void;
};

function ImagePost({ post, handlePostContent, handleImageChange }: Props) {
  return (
    <>
      <TextareaAutosize
        className="font-bold outline-none resize-none placeholder:text-gray-600 w-full"
        placeholder="Say something about this image."
        maxLength={post.maxLength}
        value={post.content}
        onChange={(e) => handlePostContent(e)}
      />
      <div className="w-full flex justify-center items-center bg-gray-200">
        {post.image ? (
          <img
            alt="your file"
            src={URL.createObjectURL(post.image)}
            className="max-h-64"
          />
        ) : (
          <p>Please select an image.</p>
        )}
      </div>
      <form className="pt-2" encType="multipart/form-data">
        <input
          type="file"
          onChange={handleImageChange}
          name="post-image"
          accept="image/png, image/jpeg"
        />
      </form>
    </>
  );
}

export default ImagePost;
