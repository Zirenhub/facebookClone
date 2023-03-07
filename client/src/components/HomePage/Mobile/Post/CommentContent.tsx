import { TComment } from '../../../../types/Post';

type Props = {
  replyingToMe: boolean;
  comment: TComment;
};

function CommentContent({ replyingToMe, comment }: Props) {
  return (
    <div
      className={`flex flex-col rounded-lg py-1 px-2 ${
        replyingToMe ? 'bg-blue-200' : 'bg-gray-200'
      }`}
    >
      <p className="font-bold">{comment.author.fullName}</p>
      <p>{comment.content}</p>
    </div>
  );
}

export default CommentContent;
