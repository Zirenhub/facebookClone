import { useEffect, useState } from 'react';
import moment from 'moment';
import { TDBPost } from '../../../../types/Post';
import Pfp from '../../../../assets/pfp-two.svg';

function ImagePost({ data }: { data: TDBPost }) {
  const [postDate, setPostDate] = useState<string | null>(null);

  useEffect(() => {
    setPostDate(moment(new Date(data.createdAt)).format('MMM Do, YYYY'));
  }, [data]);

  return (
    <>
      <div className="flex gap-2">
        <div className="w-12 h-12">
          <Pfp height="100%" width="100%" />
        </div>
        <div className="flex flex-col">
          <p className="font-bold">{data.author.fullName}</p>
          <p>{postDate}</p>
        </div>
      </div>
      <div>
        <p className="font-bold text-lg">{data.content}</p>
        <img alt="post" src={data.image} />
      </div>
    </>
  );
}

export default ImagePost;
