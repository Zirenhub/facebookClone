import { TComment } from '../../../../types/Post';

type Props = {
  replyingTo: TComment | null;
  comment: TComment;
};

function CommentContent({ replyingTo, comment }: Props) {
  return (
    <div
      className={`flex flex-col rounded-lg py-1 px-2 ${
        replyingTo?._id === comment._id ? 'bg-blue-200' : 'bg-gray-200'
      }`}
    >
      <p className="font-bold">{comment.author.fullName}</p>
      <p>{comment.content}</p>
    </div>
  );
}

export default CommentContent;
