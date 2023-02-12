import { TDBPost } from '../../../../types/Post';

function DefaultPost({ data }: { data: TDBPost }) {
  return (
    <div>
      <p>{data.content}</p>
    </div>
  );
}

export default DefaultPost;
