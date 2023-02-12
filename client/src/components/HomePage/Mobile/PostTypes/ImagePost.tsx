import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { TDBPost } from '../../../../types/Post';
import Pfp from '../../../../assets/pfp-two.svg';

function ImagePost({ data }: { data: TDBPost }) {
  const [postDate, setPostDate] = useState<string | null>(null);

  const navigate = useNavigate();

  function navigateProfile() {
    navigate(`/${data.author._id}`);
  }

  useEffect(() => {
    setPostDate(moment(new Date(data.createdAt)).format('MMM Do, YYYY'));
  }, [data]);

  return (
    <>
      <div className="flex gap-2">
        <button type="button" onClick={navigateProfile} className="w-12 h-12">
          <Pfp height="100%" width="100%" />
        </button>
        <div
          className="flex flex-col"
          onClick={navigateProfile}
          onKeyDown={navigateProfile}
          role="button"
          tabIndex={0}
        >
          <p className="font-bold">{data.author.fullName}</p>
          <p>{postDate}</p>
        </div>
      </div>
      <div>
        <p className="text-lg">{data.content}</p>
        <img alt="post" src={data.image} />
      </div>
    </>
  );
}

export default ImagePost;
