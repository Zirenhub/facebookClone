import moment from 'moment';
import { useEffect, useState } from 'react';
import Pfp from '../../../../assets/pfp-two.svg';
import { Comment } from '../../../../types/Post';

function SingleComment({ comment }: { comment: Comment }) {
  const [dateAgo, setDateAgo] = useState<string | null>(null);

  useEffect(() => {
    const commentDate = new Date(comment.createdAt);
    const ago = moment(commentDate).fromNow();
    setDateAgo(ago);
  }, [comment]);

  return (
    <>
      <div className="h-12 w-12 mr-2">
        <Pfp height="100%" width="100%" />
      </div>
      <div className="flex flex-col grow">
        <div className="flex flex-col bg-gray-200 rounded-lg py-1 px-2">
          <p className="font-bold">{comment.author.fullName}</p>
          <p>{comment.content}</p>
        </div>
        <div className="flex text-dimGray gap-3">
          <p>{dateAgo}</p>
          <button type="button">Like</button>
          <button type="button">Reply</button>
        </div>
      </div>
    </>
  );
}

export default SingleComment;
