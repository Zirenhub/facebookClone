import TextareaAutosize from 'react-textarea-autosize';
import { TPost } from '../../../../types/Post';

type Props = {
  post: TPost;
  setPost: React.Dispatch<React.SetStateAction<TPost>>;
};

function ImagePost({ post, setPost }: Props) {
  function handlePostContent(e: React.SyntheticEvent) {
    const target = e.target as HTMLTextAreaElement;
    const content = target.value.trim();
    setPost({ ...post, content });
  }

  function handleImageChange(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      setPost({ ...post, image: target.files[0] });
    }
  }

  return (
    <>
      <TextareaAutosize
        className="font-bold outline-none resize-none placeholder:text-gray-600 w-full"
        placeholder="Say something about this image."
        maxLength={450}
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
