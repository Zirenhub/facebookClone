import { TDBPost } from '../../../../types/Post';

function ImagePost({ data }: { data: TDBPost }) {
  console.log(data);

  if (data.image) {
    return (
      <div>
        <img alt="post" src={URL.createObjectURL(data.image.data)} />
      </div>
    );
  }
}

export default ImagePost;
