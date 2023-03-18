import moment from 'moment';
import { useEffect, useState } from 'react';
import TMessage from '../../types/Message';

type Props = {
  message: TMessage;
  isMyMessage: boolean;
};

function Message({ message, isMyMessage }: Props) {
  const [dateAgo, setDateAgo] = useState<string | null>(null);

  useEffect(() => {
    const ago = moment(message.createdAt).fromNow();
    setDateAgo(ago);
  }, [message]);

  return (
    <>
      <div
        className={`p-2 max-w-[280px] w-max flex justify-center rounded-lg text-white ${
          isMyMessage ? 'bg-blue-600 self-end' : 'bg-green-600'
        }`}
      >
        <p>{message.message}</p>
      </div>
      <p
        className={`text-dimGray w-fit ${isMyMessage ? 'ml-auto' : 'mr-auto'}`}
      >
        {dateAgo}
      </p>
    </>
  );
}

export default Message;
